using System.Linq;
using System.Threading.Tasks;
using API.DTOs.V1.Account;
using API.Services.Account;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.V1
{
    [ApiController]
    [Route("/account")]
    public class IdentityController : ControllerBase
    {
        private readonly IAccountService _service;

        public IdentityController(IAccountService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AccountRegistrationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AccountAuthFailedResponse {
                    Errors = ModelState.Values.SelectMany(x => 
                        x.Errors.Select(xx => xx.ErrorMessage))
                });
            }

            var authResponse = await _service.RegisterAsync(
                request.Username, request.Email, request.Password
            );

            if(!authResponse.Success)
            {
                return BadRequest(new AccountAuthFailedResponse {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AccountAuthSuccessResponse {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken,
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AccountLoginRequest request)
        {
            var authResponse = await _service.LoginAsync(request.Email, request.Password);

            if(!authResponse.Success)
            {
                return BadRequest(new AccountAuthFailedResponse {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AccountAuthSuccessResponse {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken,
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] AccountRefreshTokenRequest request)
        {
            var authResponse = await _service.RefreshTokenAsync(request.Token, request.RefreshToken);

            if(!authResponse.Success)
            {
                return BadRequest(new AccountAuthFailedResponse {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AccountAuthSuccessResponse {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken,
            });
        }
    }
}