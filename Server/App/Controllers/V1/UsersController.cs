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
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;
        private readonly IEmailSender _emailSender;

        public UsersController(
            ITokenService tokenService,
            IMapper mapper,
            ILoggerManager logger,
            IEmailSender emailSender,
            ApplicationDbContext context)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _logger = logger;
            _emailSender = emailSender;
            _context = context;
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

            var existingUsername = await _userManager.FindByNameAsync(request.UserName);
            if (existingUsername != null)
            {
                _logger.LogError($"ERROR: Username already in use");
                return BadRequest();
            }

            var existingEmail = await _userManager.FindByEmailAsync(request.Email);
            if (existingEmail != null)
            {
                _logger.LogError($"ERROR: Email already in use");
                return BadRequest();
            }

            var user = _mapper.Map<ApplicationUser>(request);
            var createdUser = await _userManager.CreateAsync(user, request.Password);
            if (!createdUser.Succeeded)
            {
                _logger.LogError($"ERROR: creating user");
                return BadRequest(createdUser.Errors.Select(x => x.Description));
            }

            await _userManager.AddToRoleAsync(
                user, Authorization.default_role.ToString());

            _logger.LogInfo($"INFO: User {request.UserName} created");

            var userAuth = await _tokenService.GenerateAuthenticationResultForUserAsync(user);

            var authentication = _mapper.Map<AuthenticationDTO>(userAuth);
            return Ok(authentication);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginDTO request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                _logger.LogError($"ERROR: user email/password invalid");
                return BadRequest();
            }

            var userHasValidPassword = await _userManager.CheckPasswordAsync(user, request.Password);
            if(!userHasValidPassword)
            {
                _logger.LogError($"ERROR: user email/password invalid");
                return BadRequest();
            }

            _logger.LogInfo($"INFO: user {request.Email} logged");

            var authResponse = await _tokenService.GenerateAuthenticationResultForUserAsync(user);
            if(!authResponse.Success)
            {
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                _logger.LogError($"ERROR: user login.");
                return BadRequest(failedAuth.Errors);
            }

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] Authentication request)
        {
            var authResponse = await _tokenService.RefreshTokenAsync(request.Token, request.RefreshToken);

            if(!authResponse.Success)
            {
                _logger.LogError($"ERROR: refreshing token.");
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                return BadRequest(failedAuth.Errors);
            }

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
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

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(PasswordReset passwordReset)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("ERROR: password reset validation.");
                return BadRequest();
            }

            var user = await _userManager.FindByEmailAsync(passwordReset.Email);
            if (user == null)
            {
                _logger.LogError($"ERROR: retrieving user.");
                return BadRequest();
            }

            var passwordResetResult = await _userManager.ResetPasswordAsync(
                user, passwordReset.Token, passwordReset.Password);
            if (!passwordResetResult.Succeeded)
            {
                _logger.LogError($"ERROR: password reset failed");
                return BadRequest(passwordResetResult.Errors.Select(x => x.Description));
            }

            var newAuth = await _tokenService.GenerateAuthenticationResultForUserAsync(user);
            var authResponse = _mapper.Map<AuthenticationDTO>(newAuth);
            return Ok(authResponse);
        }

        // TODO: cascade delete refresh token
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