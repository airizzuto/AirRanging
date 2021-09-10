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
using Entities.Models.Pagination;
using Entities.DTOs.V1.Aircrafts;
using System;

namespace App.Controllers.V1
{
    /// <summary>
    /// Bookmark model controller endpoints:
    /// <para> GetUserBookmarks             - GET     api/bookmarks    </para>
    /// <para> GetUserBookmarkedAircraftId  - GET     api/bookmarks/5  </para>
    /// <para> DeleteAircraftBookmark       - DELETE  api/bookmarks/5  </para>
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

        // GET api/bookmarks
        /// <summary>
        /// Retrieves all user aircrafts bookmarked by the user.
        /// </summary>
        /// <response code="200">Retrieves all aircrafts saved by user</response>
        /// <response code="401">Unauthorized. User not logged in.</response>
        [HttpGet]
        public async Task<ActionResult<PagedList<AircraftReadDTO>>> GetUserBookmarkedAircrafts()
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to create aircraft.");

                return Unauthorized();
            }

            var aircrafts = await _repository.Bookmark.GetAircraftsBookmarkedAsync(userId);

            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            _logger.LogInfo($"Returning {aircraftsResponse.Count()} bookmarked aircrafts from db.");

            return Ok(aircraftsResponse);
        }

        // GET api/bookmarks/5
        /// <summary>
        /// Retrieves user aircraft id bookmarked by user.
        /// </summary>
        /// <response code="200">Retrieves aircraft id bookmarked by user</response>
        /// <response code="401">Unauthorized. User not logged in.</response>
        /// <response code="404">Aircraft id not found in bookmark.</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<AircraftReadDTO>> GetUserBookmarkedAircraftId(Guid id)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to create aircraft.");

                return Unauthorized();
            }

            var aircrafts = await _repository.Bookmark.GetBookmarkIdAsync(userId, id);
            if (aircrafts == null)
            {
                _logger.LogError($"Aircraft id {id} not found in user bookmark.");
                return NotFound("Aircraft id not found");
            }

            var aircraftsResponse = _mapper.Map<AircraftReadDTO>(aircrafts);
            _logger.LogInfo($" Returning aircraft {id}.");

            return Ok(aircraftsResponse);
        }

        // DELETE api/bookmarks/id
        /// <summary>
        /// Removes bookmark for aircraft id
        /// </summary>
        /// <response code="204">Bookmark removed successfully</response>
        /// <response code="401">Unauthorized. User not logged in.</response>
        /// <response code="404">Aircraft id not found in bookmark</response>
        [HttpDelete("{aircraftId}")]
        public async Task<IActionResult> DeleteBookmarkedAircraft(Guid aircraftId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to create aircraft.");

                return Unauthorized();
            }

            _repository.Bookmark.RemoveBookmarkAsync(userId, aircraftId);
            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId}, Aircraft {aircraftId} bookmark removed.");

            return NoContent();
        }
    }
}