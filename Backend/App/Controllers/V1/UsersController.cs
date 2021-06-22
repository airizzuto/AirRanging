using System.Linq;
using System.Threading.Tasks;
using Entities.DTOs.V1.Identity;
using Contracts;
using Microsoft.AspNetCore.Mvc;
using Entities.Models.Identity;
using AutoMapper;

namespace App.Controllers.V1
{
    /// <summary>
    /// Aircraft model controller endpoints:
    /// <para> RegisterUser  - POST  api/users/register  </para>
    /// <para> LoginUser     - POST  api/users/login     </para>
    /// <para> RefreshToken  - POST  api/users/refresh   </para>
    /// </summary>
    [ApiController]
    [Route("/users")]
    public class UsersController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public UsersController(
            IRepositoryWrapper repository,
            ILoggerManager logger,
            IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
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

            var authResponse = await _repository.ApplicationUser.RegisterAsync(userRegistration, request.Password);

            if(!authResponse.Success)
            {
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                return BadRequest(failedAuth.Errors);
            }

            _logger.LogInfo($"INFO: User: {request.UserName} created");

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginDTO request)
        {
            var authResponse = await _repository.ApplicationUser.LoginAsync(request.Email, request.Password);

            if(!authResponse.Success)
            {
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                _logger.LogError($"Login error: {failedAuth.Errors}");
                return BadRequest(failedAuth.Errors);
            }

            _logger.LogInfo($"INFO: User {request.Email} logged");

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] Authentication request)
        {
            var authResponse = await _repository.ApplicationUser.RefreshTokenAsync(request.Token, request.RefreshToken);

            if(!authResponse.Success)
            {
                var failedAuth = _mapper.Map<AuthenticationFailedDTO>(authResponse);
                return BadRequest(failedAuth.Errors);
            }

            var authentication = _mapper.Map<AuthenticationDTO>(authResponse);
            return Ok(authentication);
        }
    }
}