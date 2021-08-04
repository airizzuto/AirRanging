using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Entities.Models.Identity;
using Entities.DTOs.V1.Identity;
using Contracts;
using AutoMapper;
using Logger;
using Emailer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Constants;
using Data;
using System.Collections.Generic;
using System.Security.Claims;
using System;

namespace App.Controllers.V1
{
    /// <summary>
    /// Users authentication and registration model controller endpoints:
    /// <para> RegisterUser    - POST    api/users/register     </para>
    /// <para> LoginUser       - POST    api/users/login        </para>
    /// <para> ConfirmEmail    - GET     api/users/confirmation </para>
    /// <para> ForgotPassword  - POST    api/users/forgot       </para>
    /// <para> ResetPassword   - POST    api/users/reset        </para>
    /// <para> DeleteUser      - DELETE  api/users/5            </para>
    /// </summary>
    [ApiController]
    [ApiVersion("1.0")]
    [Route("/api/users")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;
        private readonly IEmailSender _emailSender;

        public UsersController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            ITokenService tokenService,
            IMapper mapper,
            ILoggerManager logger,
            IEmailSender emailSender)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
            _logger = logger;
            _emailSender = emailSender;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegistrationDTO request)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"User registration validation failed.");
                return BadRequest(new UserAuthFailedDTO {
                    Errors = ModelState.Values.SelectMany(x => 
                        x.Errors.Select(xx => xx.ErrorMessage))
                });
            }

            var existingUsername = await _userManager.FindByNameAsync(request.UserName);
            if (existingUsername != null)
            {
                _logger.LogError($"ERROR: Username already in use.");
                return BadRequest("Username already in use.");
            }

            var existingEmail = await _userManager.FindByEmailAsync(request.Email);
            if (existingEmail != null)
            {
                _logger.LogError($"ERROR: Email already in use.");
                return BadRequest("Email already in use.");
            }

            var user = _mapper.Map<ApplicationUser>(request);
            var createdUser = await _userManager.CreateAsync(user, request.Password);
            if (!createdUser.Succeeded)
            {
                _logger.LogError($"ERROR: creating user.");
                return BadRequest(createdUser.Errors.Select(x => x.Description));
            }

            await _userManager.AddToRoleAsync(
                user, Authorization.default_role.ToString());

            await _context.SaveChangesAsync();

            _logger.LogInfo($"INFO: User {request.UserName} created");
            return Ok("User registered successfully");
        }

        /// <summary>
        /// User login authentication controller
        /// </summary>
        /// <param name="userLogin"></param>
        /// <response code="200">User authentication successful</response>
        ///     <returns>Authentication tokens</returns>
        /// <response code="400">User login validation error.</response>
        /// <response code="401">User login credentails invalid.</response>
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginDTO userLogin)
        {
            if (userLogin == null)
            {
                _logger.LogError($"ERROR: Invalid client request");
                return BadRequest("Invalid client request");
            }

            var user = await _userManager.FindByEmailAsync(userLogin.Email);
            if (user == null)
            {
                _logger.LogError($"ERROR: user email/password invalid");
                return Unauthorized();
            }

            var userHasValidPassword = await _userManager.CheckPasswordAsync(user, userLogin.Password);
            if(!userHasValidPassword)
            {
                _logger.LogError($"ERROR: user email/password invalid");
                return Unauthorized();
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            
            var claims = new List<Claim>
            {
                // uid claim used with HttpContext in aircrafts controller to check for user authorship creating, updating and deleting aircrafts
                new Claim("uid", user.Id),

                new Claim(ClaimTypes.Name, user.UserName),

            };
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var accessToken = _tokenService.GenerateAccessToken(claims); // To client storage?
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenCreationTime = DateTime.Now;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(30);

            await _context.SaveChangesAsync();

            _logger.LogInfo($"INFO: user {user.Id} logged");
            return Ok(new UserAuthDTO
            {
                Username = user.UserName,
                Token = accessToken,
                RefreshToken = refreshToken
            });
        }

        // // TODO: Email confirmation
        // [HttpGet("confirmation")]
        // public async Task<IActionResult> ConfirmEmail(string token, string email)
        // {
        //     var user = await _userManager.FindByEmailAsync(email);
        //     if (user == null)
        //     {
        //         _logger.LogError($"ERROR: retrieving user.");
        //         return BadRequest();
        //     }

        //     var result = await _userManager.ConfirmEmailAsync(user, token);
        //     if (!result.Succeeded)
        //     {
        //         _logger.LogError($"ERROR: confirming user {user.Id} email.");
        //         return BadRequest();
        //     }

        //     return NoContent();
        // }

        // TODO: test
        [HttpPost("forgot")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(PasswordResetForgotDTO forgotPassword)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"ERROR: forgot password validation failed.");
                return BadRequest("Validation failed.");
            }

            var user = await _userManager.FindByEmailAsync(forgotPassword.Email);
            if (user == null)
            {
                _logger.LogError($"ERROR: failed retrieving user.");
                return BadRequest("Invalid user request.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callback = Url.Action(nameof(ResetPassword), "Users", new { token, email = user.Email }, Request.Scheme);

            var message = new Message(new string[] { user.Email }, "Reset password token", callback);
            await _emailSender.SendEmailAsync(message);

            _logger.LogInfo($"INFO: password reset email sent.");
            return NoContent();
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(PasswordResetModel passwordReset)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("ERROR: password reset validation.");
                return BadRequest("Password reset validation failed.");
            }

            var user = await _userManager.FindByEmailAsync(passwordReset.Email);
            if (user == null)
            {
                _logger.LogError($"ERROR: retrieving user.");
                return BadRequest("Invalid user.");
            }

            var passwordResetResult = await _userManager.ResetPasswordAsync(
                user, passwordReset.Token, passwordReset.Password);
            if (!passwordResetResult.Succeeded)
            {
                _logger.LogError($"ERROR: password reset failed.");
                return BadRequest(passwordResetResult.Errors.Select(x => x.Description));
            }

            _logger.LogInfo($"INFO: password reset successful.");
            return Ok("Password reset successfully.");
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                _logger.LogError($"ERROR: retrieving user.");
                return BadRequest();
            }
            var UserDeletedResult = await _userManager.DeleteAsync(user);
            if (!UserDeletedResult.Succeeded)
            {
                _logger.LogError($"ERROR: deleting User {id}.");
                return BadRequest(UserDeletedResult.Errors.Select(e => e.Description));
            }
            
            await _context.SaveChangesAsync();
            _logger.LogInfo($"INFO: user {id} deleted.");

            return NoContent();
        }

        // TODO: update user
    }
}