using System.Threading.Tasks;
using API.Data.Repositories;
using API.DTOs.V1.Registration;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.V1
{
    [ApiController]
    [Route("/identity")]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityRepository _repository;

        public IdentityController(IIdentityRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            var authResponse = await _repository.RegisterAsync(request.Email, request.Password);

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