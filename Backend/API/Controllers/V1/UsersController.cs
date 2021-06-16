using System;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.V1.Identity;
using API.Services.Identity;
using Contracts;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.V1
{
    [ApiController]
    [Route("/account")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly ILoggerManager _logger;

        public UsersController(IUserService service, ILoggerManager logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new AuthFailedResponse {
                        Errors = ModelState.Values.SelectMany(x => 
                            x.Errors.Select(xx => xx.ErrorMessage))
                    });
                }

                var authResponse = await _service.RegisterAsync(
                    request.Username, request.Email, request.Password
                );

                if(!authResponse.Success)
                {
                    return BadRequest(new AuthFailedResponse {
                        Errors = authResponse.Errors
                    });
                }

                _logger.LogInfo($"INFO: User created");

                return Ok(new AuthSuccessResponse {
                    Token = authResponse.Token,
                    RefreshToken = authResponse.RefreshToken,
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'Register' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            try
            {
                var authResponse = await _service.LoginAsync(request.Email, request.Password);

                if(!authResponse.Success)
                {
                    return BadRequest(new AuthFailedResponse {
                        Errors = authResponse.Errors
                    });
                }

                _logger.LogInfo($"INFO: User {request.Email} logged");

                return Ok(new AuthSuccessResponse {
                    Token = authResponse.Token,
                    RefreshToken = authResponse.RefreshToken,
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'Login' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] UserRefreshTokenRequest request)
        {
            try
            {
                var authResponse = await _service.RefreshTokenAsync(request.Token, request.RefreshToken);

                if(!authResponse.Success)
                {
                    return BadRequest(new AuthFailedResponse {
                        Errors = authResponse.Errors
                    });
                }

                return Ok(new AuthSuccessResponse {
                    Token = authResponse.Token,
                    RefreshToken = authResponse.RefreshToken,
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'RefreshToken' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}