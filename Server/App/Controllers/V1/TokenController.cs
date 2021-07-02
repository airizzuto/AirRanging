using AutoMapper;
using Contracts;
using Data;
using Logger;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers.V1
{
    /// <summary>
    /// Token controller endpoints:
    /// <para> RegisterUser  - POST    api/tokens/refresh      </para>
    /// <para> LoginUser     - POST    api/tokens/revoke         </para>
    /// </summary>
    [ApiController]
    [ApiVersion("1.0")]
    [Route("/api/tokens")]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;

        public TokenController(
            ApplicationDbContext context,
            ITokenService tokenService,
            IMapper mapper,
            ILoggerManager logger)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
            _logger = logger;
        }

        // TODO: endpoints
  }
}