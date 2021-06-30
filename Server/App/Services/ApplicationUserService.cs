using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Constants;
using Contracts;
using Data;
using Entities.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Repository.Settings;

namespace App
{
    public class ApplicationUserService : IApplicationUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager; // TODO:

        private readonly ApplicationDbContext _context;
        private readonly JwtSettings _jwtSettings;

        public ApplicationUserService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context,
            JwtSettings jwtSettings)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtSettings = jwtSettings;
            _context = context;
        }

        public async Task<ApplicationUser> GetUserAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<Authentication> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new Authentication
                {
                    Errors = new[] { "Email not found" } 
                };
            }

            var userHasValidPassword = await _userManager.CheckPasswordAsync(user, password);
            if(!userHasValidPassword)
            {
                return new Authentication
                {
                    Errors = new[] {"User/password invalid"}
                };
            }

            return await GenerateAuthenticationResultForUserASync(user);
        }

        public async Task<Authentication> RegisterAsync(
            ApplicationUser user, string password)
        {
            var existingUsername = await _userManager.FindByNameAsync(user.UserName);
            if (existingUsername != null)
            {
                return new Authentication
                {
                    Errors = new[] { "Username already in use" }
                };
            }

            var existingEmail = await _userManager.FindByEmailAsync(user.Email);
            if (existingEmail != null)
            {
                return new Authentication
                {
                    Errors = new[] { "Email already in use" }
                };
            }

            var createdUser = await _userManager.CreateAsync(user, password);
            if (!createdUser.Succeeded)
            {
                return new Authentication
                {
                    Errors = createdUser.Errors.Select(x => x.Description)
                };
            }

            await _userManager.AddToRoleAsync(
                user, Authorization.default_role.ToString());

            return await GenerateAuthenticationResultForUserASync(user);
        }

        public async Task<Authentication> ResetPasswordAsync(
            ApplicationUser user, string token, string password)
        {
            var passwordResetResult = await _userManager.ResetPasswordAsync(user, token, password);
            if (!passwordResetResult.Succeeded)
            {
                return new Authentication
                {
                    Errors = passwordResetResult.Errors.Select(x => x.Description)
                };
            }

            return await GenerateAuthenticationResultForUserASync(user);
        }

        public async Task<Authentication> RefreshTokenAsync(string token, string refreshToken)
        {
            var claimsPrincipal = GetPrincipalFromToken(token);
            if (claimsPrincipal == null)
            {
                return new Authentication { Errors = new[] {"Invalid Token"} };
            }

            var expirationDateUnix = long.Parse(claimsPrincipal.Claims.Single(
                x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expirationDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddSeconds(expirationDateUnix);

            if (expirationDateTimeUtc < DateTime.UtcNow)
            {
                return new Authentication { Errors = new[] {"Invalid token"} };
                // return new AuthenticationResult { Errors = new[] {"This token has not expired yet"} };
            }

            var jti = claimsPrincipal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            var storedRefreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(x => x.Token == refreshToken);

            #region detailed token validation errors
            // if (storedRefreshToken == null)
            // {
            //     return new AuthenticationResult { Errors = new[] {"This refresh token does not exist"} };
            // }

            // if (DateTime.UtcNow > storedRefreshToken.ExpirationDate)
            // {
            //     return new AuthenticationResult { Errors = new[] {"This refresh token has expired"} };
            // }

            // if (storedRefreshToken.Invalidated)
            // {
            //     return new AuthenticationResult { Errors = new[] {"This refresh token has been invalidated"} };
            // }

            // if (storedRefreshToken.Used)
            // {
            //     return new AuthenticationResult { Errors = new[] {"This refresh token has been used"} };
            // }

            // if (storedRefreshToken.JwtId != jti)
            // {
            //     return new AuthenticationResult { Errors = new[] {"This refresh token does not math this JWT"} };
            // }
            #endregion

            if (storedRefreshToken == null 
                || DateTime.UtcNow > storedRefreshToken.ExpirationDate
                || storedRefreshToken.Invalidated
                || storedRefreshToken.Used
                || storedRefreshToken.JwtId != jti)
            {
                return new Authentication{ Errors = new[] {"Invalid token"} };
            }

            storedRefreshToken.Used = true;
            _context.RefreshTokens.Update(storedRefreshToken);
            await _context.SaveChangesAsync(); 

            var user = await _userManager.FindByIdAsync(claimsPrincipal.Claims.Single(x => x.Type == "id").Value);

            return await GenerateAuthenticationResultForUserASync(user);
        }

        // TODO: user delete
        // TODO: user update

        private ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
                ValidIssuer = Path.Local.Full + "/airrangingapi",
                ValidAudience = Path.Local.Full + "/airranginguser",
                ValidateIssuerSigningKey = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                RequireExpirationTime = false,
            };

            try
            {
                var principal = tokenHandler.ValidateToken(
                    token,
                    tokenValidationParameters,
                    out var claimsPrincipal
                );

                if (!IsJwtWithValidSecurityAlgorithm(claimsPrincipal))
                {
                    return null;
                }
                return principal;
            }
            catch
            {
                return null;
            }
        }

        private static bool IsJwtWithValidSecurityAlgorithm(SecurityToken claimsPrincipal)
        {
            return (claimsPrincipal is JwtSecurityToken jwtSecurityToken) 
                && jwtSecurityToken.Header.Alg.Equals(
                    SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);
        }

        private async Task<Authentication> GenerateAuthenticationResultForUserASync(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti,
                        Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("uid", user.Id),
                    new Claim("username", user.UserName)
                }.Union(userClaims)
                 .Union(roleClaims)),
                Issuer = Path.Local.Full + "/airrangingapi",
                Audience = Path.Local.Full + "/airranginguser",
                NotBefore = DateTime.Now,
                Expires = DateTime.UtcNow.Add(_jwtSettings.TokenLifetime),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                CreationDate = DateTime.UtcNow,
                ExpirationDate = DateTime.UtcNow.AddMonths(3)
            };

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return new Authentication
            {
                Success = true,
                Token = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken.Token
            };
        }
    }
}