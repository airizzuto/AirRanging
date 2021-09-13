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
    /// <para> GetUserBookmarks             - GET    -  api/bookmarks        </para>
    /// <para> GetUserBookmarkedAircraftId  - GET    -  api/bookmarks/5      </para>
    /// <para> GetAircraftsSavedByUser      - GET    -  api/bookmarks/saved  </para>
    /// <para> SaveAircraftId               - POST   -  api/bookmarks/5      </para>
    /// <para> UnsaveAircraftId             - DELETE -  api/bookmarks/5      </para>
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
        [HttpGet("{aircraftId}")]
        public async Task<ActionResult<AircraftReadDTO>> GetUserBookmarkedAircraftId(string aircraftId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to create aircraft.");

                return Unauthorized();
            }

            var aircrafts = await _repository.Bookmark.GetBookmarkIdAsync(userId, aircraftId);
            if (aircrafts == null)
            {
                _logger.LogError($"Aircraft id {aircraftId} not found in user bookmark.");
                return NotFound("Aircraft id not found");
            }

            var aircraftsResponse = _mapper.Map<AircraftReadDTO>(aircrafts);
            _logger.LogInfo($" Returning aircraft {aircraftId}.");

            return Ok(aircraftsResponse);
        }

        
        // GET api/bookmarks/saved
        /// <summary>
        /// Retrieves aircrafts created by user.
        /// </summary>
        /// <response code="200">Aircrafts retrieved successfully</response>
        /// <response code="401">User not logged in. Unable to retrieve user aircrafts</response>
        [HttpGet("saved")]
        public async Task<IActionResult> GetSavedAircrafts()
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($" User not logged in.");

                return Unauthorized("User not logged in.");
            }

            var aircrafts = await _repository.Bookmark.GetAircraftsBookmarkedAsync(userId);

            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            _logger.LogInfo(
                $" Returning paginated {aircraftsResponse.Count()} aircrafts from db."
            );

            return Ok(aircraftsResponse);
        }

        // POST api/bookmarks/
        /// <summary>
        /// Save aircraft {id} to current user bookmarks
        /// </summary>
        /// <response code="204">Aircraft {id} saved to current user bookmarks</response>
        /// <response code="401">User not logged in</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPost]
        public async Task<IActionResult> SaveAircraftId([FromBody] AircraftSaveDTO request)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($" User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingAircraft = await _repository.Aircraft
                .GetAircraftByIdAsync(request.aircraftId);
            if (existingAircraft == null)
            {
                _logger.LogError($" Aircraft {request.aircraftId}, not found.");
                return NotFound("Aircraft not found.");
            }

            var isAircraftAlreadySaved = await _repository.Bookmark
                .GetBookmarkIdAsync(userId, request.aircraftId);
            if (isAircraftAlreadySaved != null)
            {
                _logger.LogError($" Aircraft {request.aircraftId} already saved to user {userId}.");
                return BadRequest(" Aircraft already saved");
            }

            var bookmarkCreated = await _repository.Bookmark.CreateBookmarkAsync(userId, request.aircraftId);
            _repository.Aircraft.CountAircraftSaved(existingAircraft);

            await _repository.SaveAsync();

            var aircraftResponse = _mapper.Map<AircraftReadDTO>(existingAircraft);

            _logger.LogInfo($"User {userId} saved aircraft {aircraftResponse.Id}.");

            // FIXME: response
            return CreatedAtAction(
                actionName: nameof(GetUserBookmarkedAircraftId),
                routeValues: new {aircraftId = bookmarkCreated.AircraftId},
                value: bookmarkCreated
            );
        }

        // DELETE api/bookmarks/5
        /// <summary>
        /// Unsaves aircraft {id} to current user bookmarks
        /// </summary>
        /// <param name="aircraftId">aircraft ID</param>
        /// <response code="204">Aircraft {id} saved to current user bookmarks</response>
        /// <response code="401">User not logged in</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpDelete("{aircraftId}")]
        public async Task<IActionResult> UnsaveAircraftId(string aircraftId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingBookmark = await _repository.Bookmark.GetBookmarkIdAsync(userId, aircraftId);
            if (existingBookmark == null)
            {
                _logger.LogError($"Aircraft id {aircraftId}, not found or not saved by user {userId}.");
                return NotFound("Aircraft id not saved.");
            }

            var existingAircraft = existingBookmark.Aircraft;

            _repository.Bookmark.RemoveBookmarkAsync(userId, aircraftId);
            _repository.Aircraft.CountAircraftUnsaved(existingAircraft);

            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId} unsaved aircraft {aircraftId}.");

            return NoContent();
        }
    }
}