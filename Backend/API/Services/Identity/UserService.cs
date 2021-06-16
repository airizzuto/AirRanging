using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data.Contexts;
using API.Models;
using API.Models.Identity;
using API.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace API.Services.Identity
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtSettings _jwtSettings;
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserService> _logger;

        public UserService(
            UserManager<ApplicationUser> userManager,
            JwtSettings jwtSettings,
            TokenValidationParameters tokenValidationParameters,
            ApplicationDbContext context,
            ILogger<UserService> logger)
        {
            _userManager = userManager;
            _jwtSettings = jwtSettings;
            _tokenValidationParameters = tokenValidationParameters;
            _context = context;
            _logger = logger;
        }

        public async Task<ApplicationUser> GetUserAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        // TODO: saved response
        // public async Task SaveAircraftAsync(string userId, Guid aircraftId)
        // { 
        //     var user = await GetUserAsync(userId);

        //     _logger.LogInformation(
        //         $"INFO: saved aircraft {aircraftId} to {user.UserName}"
        //     );
        // }

        // TODO: Login with username or email. Switch if "@" is present?
        public async Task<AuthenticationResult> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Email not found" } 
                };
            }

            var userHasValidPassword = await _userManager.CheckPasswordAsync(user, password);
            if(!userHasValidPassword)
            {
                return new AuthenticationResult
                {
                    Errors = new[] {"User/password invalid"}
                };
            }

            return await GenerateAuthenticationResultForUserASync(user);
        }

        public async Task<AuthenticationResult> RegisterAsync(
            string username, string email, string password)
        {
            var existingUsername = await _userManager.FindByNameAsync(username);
            if (existingUsername != null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Username already in use" }
                };
            }

            var existingEmail = await _userManager.FindByEmailAsync(email);
            if (existingEmail != null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Email already in use" }
                };
            }

            var user = new ApplicationUser
            {
                UserName = username,
                Email = email,
            };

            var createdUser = await _userManager.CreateAsync(user, password);
            if (!createdUser.Succeeded)
            {
                return new AuthenticationResult
                {
                    Errors = createdUser.Errors.Select(x => x.Description)
                };
            }

            return await GenerateAuthenticationResultForUserASync(user);
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken)
        {
            var claimsPrincipal = GetPrincipalFromToken(token);
            if (claimsPrincipal == null)
            {
                return new AuthenticationResult { Errors = new[] {"Invalid Token"} };
            }

            var expirationDateUnix = long.Parse(claimsPrincipal.Claims.Single(
                x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expirationDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddSeconds(expirationDateUnix);

            if (expirationDateTimeUtc < DateTime.UtcNow)
            {
                return new AuthenticationResult { Errors = new[] {"Invalid token"} };
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
                return new AuthenticationResult { Errors = new[] {"Token invalid"} };
            }

            storedRefreshToken.Used = true;
            _context.RefreshTokens.Update(storedRefreshToken);
            await _context.SaveChangesAsync(); // TODO: Unit of work?

            var user = await _userManager.FindByIdAsync(claimsPrincipal.Claims.Single(x => x.Type == "id").Value);

            return await GenerateAuthenticationResultForUserASync(user);
        }

        // TODO: user delete
        // TODO: user update

        private ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var claimsPrincipal);
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

        private async Task<AuthenticationResult> GenerateAuthenticationResultForUserASync(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Iss, Constants.Path.Full),
                            new Claim(JwtRegisteredClaimNames.Email, user.Email),
                            new Claim("id", user.Id)
                        }),
                NotBefore = DateTime.Now,
                Expires = DateTime.UtcNow.Add(_jwtSettings.TokenLifetime),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
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

            return new AuthenticationResult
            {
                Success = true,
                Token = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken.Token
            };
        }
    }
}