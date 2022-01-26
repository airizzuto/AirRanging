using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using App.Extensions;
using Contracts;
using Logger;
using Entities.DTOs.V1.Aircrafts;

namespace App.Controllers.V1
{
    /// <summary>
    /// Bookmark model controller endpoints:
    /// <para> GetUserBookmarks             - GET    -  api/aircrafts/bookmarks        </para>
    /// <para> GetUserBookmarkedAircraftId  - GET    -  api/aircrafts/bookmarks/5      </para>
    /// <para> SaveAircraftId               - POST   -  api/aircrafts/bookmarks/5      </para>
    /// <para> UnsaveAircraftId             - DELETE -  api/aircrafts/bookmarks/5      </para>
    /// </summary>
    [ApiController]
    [Route("/api/aircrafts/bookmarks/")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class AircraftBookmarksController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public AircraftBookmarksController(
            ILoggerManager logger,
            IRepositoryWrapper repository,
            IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
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

            var aircrafts = await _repository.AircraftBookmark
                .GetUserResourceBookmarkIdAsync(userId, aircraftId);
            if (aircrafts == null)
            {
                _logger.LogError($"Aircraft id {aircraftId} not found in user bookmark.");
                return NotFound("Aircraft id not found");
            }

            var aircraftsResponse = _mapper.Map<AircraftReadDTO>(aircrafts);
            _logger.LogInfo($" Returning aircraft {aircraftId}.");

            return Ok(aircraftsResponse);
        }

        
        // // GET api/bookmarks/saved
        // /// <summary>
        // /// Retrieves aircrafts created by user.
        // /// </summary>
        // /// <response code="200">Aircrafts retrieved successfully</response>
        // /// <response code="401">User not logged in. Unable to retrieve user aircrafts</response>
        // [HttpGet]
        // public async Task<IActionResult> GetUserBookmarks()
        // {
        //     var userId = HttpContext.GetUserId();
        //     if (userId == null)
        //     {
        //         _logger.LogError($" User not logged in.");

        //         return Unauthorized("User not logged in.");
        //     }

        //     var aircrafts = await _repository.AircraftBookmark.GetAircraftsBookmarkedAsync(userId);

        //     var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

        //     _logger.LogInfo(
        //         $" Returning paginated {aircraftsResponse.Count()} aircrafts from db."
        //     );

        //     return Ok(aircraftsResponse);
        // }

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
                .GetAircraftByIdAsync(request.AircraftId);
            if (existingAircraft == null)
            {
                _logger.LogError($" Aircraft {request.AircraftId}, not found.");
                return NotFound("Aircraft not found.");
            }

            var isAircraftAlreadySaved = await _repository.AircraftBookmark
                .GetUserResourceBookmarkIdAsync(userId, request.AircraftId);
            if (isAircraftAlreadySaved != null)
            {
                _logger.LogError($" Aircraft {request.AircraftId} already saved to user {userId}.");
                return BadRequest(" Aircraft already saved");
            }

            var bookmarkCreated = await _repository.AircraftBookmark.CreateBookmarkAsync(userId, request.AircraftId);
            _repository.Aircraft.CountAircraftSaved(existingAircraft);

            await _repository.SaveAsync();


            _logger.LogInfo($"User {bookmarkCreated.UserId} saved aircraft {bookmarkCreated.ResourceId}.");

            return Ok(); // TODO: return bookmark?
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

            var existingBookmark = await _repository.AircraftBookmark.GetUserResourceBookmarkIdAsync(userId, aircraftId);
            if (existingBookmark == null)
            {
                _logger.LogError($"Aircraft id {aircraftId}, not found or not saved by user {userId}.");
                return NotFound("Aircraft id not saved.");
            }

            _repository.Aircraft.CountAircraftUnsaved(existingBookmark.Resource);
            _repository.AircraftBookmark.RemoveBookmarkAsync(existingBookmark);

            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId} unsaved aircraft {aircraftId}.");

            return NoContent();
        }
    }
}