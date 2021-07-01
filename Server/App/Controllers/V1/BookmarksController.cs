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
    /// <para> GetUserBookmarks        - GET     api/bookmarks    </para>
    /// <para> DeleteAircraftBookmark  - DELETE  api/bookmarks/5  </para>
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
        /// Retrieves all user aircrafts bookmarked in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
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

            _logger.LogInfo($"INFO: Returning {aircraftsResponse.Count()} bookmarked aircrafts from db.");

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

            var bookmark = await _repository.Bookmark.GetBookmarkAsync(userId, aircraftId);
            if (bookmark == null)
            {
                _logger.LogError($"User {userId}, Aircraft {aircraftId} bookmark not found.");
                return NotFound();
            }

            _repository.Bookmark.Delete(bookmark);
            await _repository.SaveAsync();

            _logger.LogInfo($"INFO: User {userId}, Aircraft {aircraftId} bookmark removed.");

            return NoContent();
        }
    }
}