using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using API.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtSettings _jwtSettings;

        public AccountService(UserManager<IdentityUser> userManager, JwtSettings jwtSettings)
        {
            _userManager = userManager;
            _jwtSettings = jwtSettings;
        }

        // TODO: Login with username or email. Switch if "@" is present?
        public async Task<AccountAuthResult> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new AccountAuthResult
                {
                    Errors = new[] { "Email not found" } 
                };
            }

            var userHasValidPassword = await _userManager.CheckPasswordAsync(user, password);
            if(!userHasValidPassword)
            {
                return new AccountAuthResult
                {
                    Errors = new[] {"User/password invalid"}
                };
            }

            return GenerateAccountAuthResultForUser(user);
        }

        public async Task<AccountAuthResult> RegisterAsync(
            string username, string email, string password)
        {
            var existingUsername = await _userManager.FindByNameAsync(username);
            if (existingUsername != null)
            {
                return new AccountAuthResult
                {
                    Errors = new[] { "Username already in use" }
                };
            }

            var existingEmail = await _userManager.FindByEmailAsync(email);
            if (existingEmail != null)
            {
                return new AccountAuthResult
                {
                    Errors = new[] { "Email already in use" }
                };
            }

            var user = new IdentityUser
            {
                UserName = username,
                Email = email,
            };

            var createdUser = await _userManager.CreateAsync(user, password);
            if (!createdUser.Succeeded)
            {
                return new AccountAuthResult
                {
                    Errors = createdUser.Errors.Select(x => x.Description)
                };
            }

            return GenerateAccountAuthResultForUser(user);
        }

        private AccountAuthResult GenerateAccountAuthResultForUser(IdentityUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Email, user.Email),
                            new Claim("id", user.Id),
                        }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new AccountAuthResult
            {
                Success = true,
                Token = tokenHandler.WriteToken(token)
            };
        }
    }
}