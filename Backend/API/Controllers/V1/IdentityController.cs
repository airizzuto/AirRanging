using System.Linq;
using System.Threading.Tasks;
using API.DTOs.V1.Registration;
using API.Services.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.V1
{
    [ApiController]
    [Route("/identity")]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _service;

        public IdentityController(IIdentityService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthFailedResponse {
                    Errors = ModelState.Values.SelectMany(x => x.Errors.Select(xx => xx.ErrorMessage))
                });
            }

            var authResponse = await _service.RegisterAsync(request.Email, request.Password);

            if(!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AuthSuccessResponse {
                Token = authResponse.Token
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            var authResponse = await _service.LoginAsync(request.Email, request.Password);

            if(!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AuthSuccessResponse {
                Token = authResponse.Token
            });
        }
    }
}