using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using App.Extensions;
using Contracts;
using Logger;
using Entities.Models.Bookmarks;
using Entities.Models.Aircrafts;
using Entities.Models.Pagination;
using Entities.DTOs.V1.Aircrafts;

namespace App.Controllers.V1
{
    /// <summary>
    /// Bookmark model controller endpoints:
    /// <para> GetUserBookmarks  - GET  api/bookmarks  </para>
    /// </summary>
    [ApiController]
    [Route("/api/bookmarks")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class BookmarksController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public BookmarksController(
            ILoggerManager logger,
            IRepositoryWrapper repository,
            IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        // TODO: to AircraftController?
        // GET api/bookmarks
        /// <summary>
        /// Retrieves all user aircrafts bookmarked in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        /// <response code="401">Unauthorized. User not logged in.</response>
        [HttpGet]
        public async Task<ActionResult<PagedList<AircraftReadDTO>>> GetUserBookmarkedAircrafts([FromQuery] AircraftParameters parameters) // FIXME
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to create aircraft.");

                return Unauthorized();
            }

            var aircrafts = await _repository.Bookmark.GetUserBookmarksAsync(userId);

            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            _logger.LogInfo($"INFO: Returning {aircraftsResponse.Count()} bookmarked aircrafts from db.");

            return Ok(aircraftsResponse);
        }
    }
}