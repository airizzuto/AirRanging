using System;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.DataProtection;
using App.Services;
using Entities.Models.Identity;
using Entities.DTOs.V1.Identity;
using Entities.DTOs.V1.Errors;
using Contracts;
using AutoMapper;
using Logger;
using Emailer;
using Constants;
using Data;

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
        private readonly IDataProtector _protector;

        public UsersController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            ITokenService tokenService,
            IMapper mapper,
            ILoggerManager logger,
            IEmailSender emailSender,
            IDataProtectionProvider protector)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
            _logger = logger;
            _emailSender = emailSender;
            _protector = protector.CreateProtector("App.UsersController");
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegistrationDTO request)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"User registration validation failed.");
                return BadRequest(new ValidationErrorDTO {
                    Errors = ModelState.Values.SelectMany(x => 
                        x.Errors.Select(xx => xx.ErrorMessage))
                });
            }

            var existingUsername = await _userManager.FindByNameAsync(request.UserName);
            if (existingUsername != null)
            {
                _logger.LogError($" Username already in use.");
                return BadRequest("Username already in use.");
            }

            var existingEmail = await _userManager.FindByEmailAsync(request.Email);
            if (existingEmail != null)
            {
                _logger.LogError($" Email already in use.");
                return BadRequest("Email already in use.");
            }

            var user = _mapper.Map<ApplicationUser>(request);
            var createdUser = await _userManager.CreateAsync(user, request.Password);
            if (!createdUser.Succeeded)
            {
                _logger.LogError($" Creating user.");
                return BadRequest(createdUser.Errors.Select(x => x.Description));
            }

            // TODO: refactor to use emailService
            var emailToken = await _userManager
                .GenerateEmailConfirmationTokenAsync(user);

            var confirmationLink = Url.Action(
                nameof(ConfirmEmail),
                "Users",
                new { emailToken, email = _protector.Protect(user.Email) },
                Request.Scheme
            );

            var emailContent = EmailerService.EmailConfirmationContent(confirmationLink);

            var message = new Message(
                new string[] { user.Email },
                "Confirmation email for Air Ranging",
                emailContent,
                null
            );
            await _emailSender.SendEmailAsync(message);

            await _userManager.AddToRoleAsync(
                user, Authorization.default_role.ToString());

            await _context.SaveChangesAsync();

            _logger.LogInfo($" User {request.UserName} created");
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
                _logger.LogError($" Invalid client request");
                return BadRequest("Invalid client request");
            }

            var user = await _userManager.FindByEmailAsync(userLogin.Email);
            if (user == null)
            {
                _logger.LogError($" User email/password invalid");
                return Unauthorized("User email or password invalid");
            }

            var userHasValidPassword = await _userManager.CheckPasswordAsync(user, userLogin.Password);
            if(!userHasValidPassword)
            {
                _logger.LogError($" User email/password invalid");
                return Unauthorized("User email or password invalid");
            }

            var userHasConfirmedEmail = await _userManager.IsEmailConfirmedAsync(user);
            if (!userHasConfirmedEmail)
            {
                _logger.LogError($" Email {userLogin.Email} is not confirmed");
                return Unauthorized("User email is not confirmed");
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

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenCreationTime = DateTime.Now;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(30);

            await _context.SaveChangesAsync();

            _logger.LogInfo($" user {user.Id} logged");
            return Ok(new UserAuthDTO
            {
                Username = user.UserName,
                Token = accessToken,
                RefreshToken = user.RefreshToken,
                RefreshTokenExpiryTime = user.RefreshTokenExpiryTime
            });
        }

        [HttpGet("confirmation")]
        public async Task<IActionResult> ConfirmEmail(string emailToken, string email)
        {
            var user = await _userManager.FindByEmailAsync(_protector.Unprotect(email));
            if (user == null)
            {
                _logger.LogError($" Retrieving user.");
                return Redirect(Path.Client.Full + "/confirmationfailed");
            }

            if (await _userManager.IsEmailConfirmedAsync(user))
            {
                _logger.LogError($" Trying to confirm user {user.Id} email.");
                return Redirect(Path.Client.Full + "/confirmationfailed");
            }

            var result = await _userManager.ConfirmEmailAsync(user, emailToken);
            if (!result.Succeeded)
            {
                _logger.LogError($" Trying to confirm user {user.Id} email.");
                return Redirect(Path.Client.Full + "/confirmationfailed");
            }

            _logger.LogInfo($" {user.Id} email confirmed.");
            return Redirect(Path.Client.Full + "/confirmed");
        }

        [HttpPost("forgot")]
        public async Task<IActionResult> ForgotPassword(PasswordResetForgotDTO forgotPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($" Forgot password validation failed.");
                return BadRequest("Invalid user request.");
            }

            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
            {
                _logger.LogError($" Failed retrieving user.");
                return BadRequest("Invalid user request.");
            }

            var userHasConfirmedEmail = await _userManager.IsEmailConfirmedAsync(user);
            if (!userHasConfirmedEmail)
            {
                _logger.LogError($" Email is not confirmed");
                return Unauthorized("Invalid user request.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var email = _protector.Protect(user.Email);
            var resetLink = Path.Client.Full + $"/reset?token={token}&email={email}";
            var content = EmailerService.PasswordResetContent(resetLink);

            var message = new Message(
                new string[] { user.Email },
                "Reset password for AirRanging",
                content,
                null
            );

            await _emailSender.SendEmailAsync(message);


            _logger.LogInfo($" Password reset email sent.");
            return Ok();
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(PasswordResetDTO passwordReset)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError(" Password reset validation failed.");
                return BadRequest("Password reset validation failed.");
            }

            var user = await _userManager.FindByEmailAsync(
                _protector.Unprotect(passwordReset.Email));
            if (user == null)
            {
                _logger.LogError($" Retrieving user.");
                return BadRequest("Invalid user.");
            }

            // Replace and trim corrects the url encoding and decoding changes
            var token = passwordReset.Token.Replace(" ", "+").Trim('"');

            var passwordResetResult = await _userManager.ResetPasswordAsync(
                user, token, passwordReset.Password);
            if (!passwordResetResult.Succeeded)
            {
                _logger.LogError(
                    $" password reset failed: " 
                    + passwordResetResult.Errors.Select(x => x.Description.ToString())
                );
                return BadRequest(passwordResetResult.Errors.Select(x => x.Description));
            }

            _logger.LogInfo($" Password reset successful.");
            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                _logger.LogError($" Retrieving user.");
                return BadRequest();
            }
            var UserDeletedResult = await _userManager.DeleteAsync(user);
            if (!UserDeletedResult.Succeeded)
            {
                _logger.LogError($" Deleting User {id}.");
                return BadRequest(UserDeletedResult.Errors.Select(e => e.Description));
            }
            
            await _context.SaveChangesAsync();
            _logger.LogInfo($" User {id} deleted.");

            return NoContent();
        }

        // TODO: update user
    }
}