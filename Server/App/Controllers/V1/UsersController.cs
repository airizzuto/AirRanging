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

namespace App.Controllers.V1
{
    /// <summary>
    /// Aircraft model controller endpoints:
    /// <para> RegisterUser  - POST    api/users/register      </para>
    /// <para> LoginUser     - POST    api/users/login         </para>
    /// <para> RefreshToken  - POST    api/users/refresh       </para>
    /// <para> ConfirmEmail  - GET     api/users/confirmation  </para>
    /// <para> ResetPassword - POST    api/users/reset         </para>
    /// <para> DeleteUser    - DELETE  api/users/5             </para>
    /// </summary>
    [ApiController]
    [ApiVersion("1.0")]
    [Route("/api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IApplicationUserService _userService;
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;
        private readonly IEmailSender _emailSender;

        public UsersController(
            IApplicationUserService service,
            IMapper mapper,
            ILoggerManager logger,
            IEmailSender emailSender)
        {
            _userService = service;
            _mapper = mapper;
            _logger = logger;
            _emailSender = emailSender;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegistrationDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthenticationFailedDTO {
                    Errors = ModelState.Values.SelectMany(x => 
                        x.Errors.Select(xx => xx.ErrorMessage))
                });
            }

            var userRegistration = _mapper.Map<ApplicationUser>(request);

            var authResponse = await _userService.RegisterAsync(userRegistration, request.Password);

            if(!authResponse.Success)
            {
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                return BadRequest(failedAuth.Errors);
            }

            _logger.LogInfo($"INFO: User {request.UserName} created");

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginDTO request)
        {
            var authResponse = await _userService.LoginAsync(request.Email, request.Password);

            if(!authResponse.Success)
            {
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                _logger.LogError($"ERROR: user login.");
                return BadRequest(failedAuth.Errors);
            }

            _logger.LogInfo($"INFO: User: {request.Email} logged");

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] Authentication request)
        {
            var authResponse = await _userService.RefreshTokenAsync(request.Token, request.RefreshToken);

            if(!authResponse.Success)
            {
                _logger.LogError($"ERROR: refreshing token.");
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                return BadRequest(failedAuth.Errors);
            }

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
        }

        // TODO: Email confirmation
        [HttpGet("confirmation")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                _logger.LogError($"ERROR: retrieving user.");
                return BadRequest();
            }

            var result = await _userService.ConfirmUserEmailAsync(user, token);
            if (!result.Succeeded)
            {
                _logger.LogError($"ERROR: confirming user {user.Id} email.");
                return BadRequest();
            }

            return NoContent();
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(PasswordReset passwordReset)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("ERROR: password reset validation.");
                return BadRequest();
            }

            var user = await _userService.GetUserByEmailAsync(passwordReset.Email);
            if (user == null)
            {
                _logger.LogError($"ERROR: retrieving user.");
                return BadRequest();
            }

            var passwordResetResult = await _userService.ResetPasswordAsync(
                user, passwordReset.Token, passwordReset.Password);
            if (!passwordResetResult.Success)
            {
                var failedPasswordReset = _mapper.Map<AuthenticationFailedDTO>(passwordResetResult);
                return BadRequest(failedPasswordReset.Errors);
            }

            return NoContent();
        }

        // TODO: cascade delete refresh token
        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userService.GetUserAsync(id);
            if (user == null)
            {
                _logger.LogError($"ERROR: retrieving user.");
                return BadRequest();
            }
            var UserDeletedResult = await _userService.DeleteUserAsync(user);
            if (!UserDeletedResult.Succeeded)
            {
                _logger.LogError($"ERROR: deleting User {id}.");
                return BadRequest(UserDeletedResult.Errors.Select(e => e.Description));
            }
            
            await _userService.SaveChangesAsync();
            _logger.LogInfo($"INFO: user {id} deleted.");

            return NoContent();
        }

        // TODO: update user
    }
}