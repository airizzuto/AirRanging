using System;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Data;
using Entities.DTOs.V1.Identity;
using Entities.Models.Identity;
using Logger;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers.V1
{
    /// <summary>
    /// Token controller endpoints:
    /// <para> RegisterUser  - POST  api/tokens/refresh </para>
    /// <para> LoginUser     - POST  api/tokens/revoke  </para>
    /// </summary>
    [ApiController]
    [ApiVersion("1.0")]
    [Route("/api/tokens")]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILoggerManager _logger;

        public TokenController(
            ApplicationDbContext context,
            ITokenService tokenService,
            UserManager<ApplicationUser> userManager,
            ILoggerManager logger)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        [Route("Refresh")]
        public async Task<IActionResult> Refresh(UserAuthDTO userTokens)
        {
            if (userTokens is null)
            {
                _logger.LogError($"Error validating user tokens model");
                return BadRequest("Invalid client request.");
            }

            string accessToken = userTokens.Token;
            string refreshToken = userTokens.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name;  // mapped by default to Name claim

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) 
            {
                _logger.LogError($"Error validating user tokens. User not found.");
                return BadRequest("Invalid client request");
            } else if (user.RefreshToken != refreshToken)
            {
                _logger.LogError($"Error validating user tokens. Refresh token not valid.");
                return BadRequest("Invalid client request");
            } else if (user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                _logger.LogError($"Error validating user tokens. Refresh token expired.");
                return BadRequest("Invalid client request");
            }

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();

            _logger.LogInfo($"Tokens refreshed");

            return new ObjectResult(new 
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken
            });
        }

        [HttpPost]
        [Authorize]
        [Route("revoke")]
        public async Task<IActionResult> Revoke()
        {
            var username = User.Identity.Name;

            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return BadRequest();
            }

            user.RefreshToken = null;

            await _context.SaveChangesAsync();

            _logger.LogInfo($"Tokens revoked");

            return NoContent();
        }
    }
}