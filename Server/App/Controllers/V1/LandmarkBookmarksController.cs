using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using App.Extensions;
using Contracts;
using Logger;
using Entities.DTOs.V1.Landmarks;

namespace App.Controllers.V1
{
    /// <summary>
    /// Bookmark model controller endpoints:
    /// <para> GetUserBookmarks             - GET    -  api/landmarks/bookmarks        </para>
    /// <para> GetUserBookmarkedLandmarkId  - GET    -  api/landmarks/bookmarks/5      </para>
    /// <para> SaveLandmarkId               - POST   -  api/landmarks/bookmarks/5      </para>
    /// <para> UnsaveLandmarkId             - DELETE -  api/landmarks/bookmarks/5      </para>
    /// </summary>
    [ApiController]
    [Route("/api/landmarks/bookmarks")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class LandmarkBookmarksController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public LandmarkBookmarksController(
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
        /// Retrieves user landmark id bookmarked by user.
        /// </summary>
        /// <response code="200">Retrieves landmark id bookmarked by user</response>
        /// <response code="401">Unauthorized. User not logged in.</response>
        /// <response code="404">Landmark id not found in bookmark.</response>
        [HttpGet("{LandmarkId}")]
        public async Task<ActionResult<LandmarkReadDTO>> GetUserBookmarkedLandmarkId(string LandmarkId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to create landmark.");

                return Unauthorized();
            }

            var landmarks = await _repository.LandmarkBookmark
                .GetUserResourceBookmarkIdAsync(userId, LandmarkId);
            if (landmarks == null)
            {
                _logger.LogError($"Landmark id {LandmarkId} not found in user bookmark.");
                return NotFound("Landmark id not found");
            }

            var landmarksResponse = _mapper.Map<LandmarkReadDTO>(landmarks);
            _logger.LogInfo($" Returning landmark {LandmarkId}.");

            return Ok(landmarksResponse);
        }

        
        // // GET api/bookmarks/saved
        // /// <summary>
        // /// Retrieves landmarks created by user.
        // /// </summary>
        // /// <response code="200">Landmarks retrieved successfully</response>
        // /// <response code="401">User not logged in. Unable to retrieve user landmarks</response>
        // [HttpGet]
        // public async Task<IActionResult> GetUserBookmarks()
        // {
        //     var userId = HttpContext.GetUserId();
        //     if (userId == null)
        //     {
        //         _logger.LogError($" User not logged in.");

        //         return Unauthorized("User not logged in.");
        //     }

        //     var landmarks = await _repository.LandmarkBookmark.GetLandmarksBookmarkedAsync(userId);

        //     var landmarksResponse = _mapper.Map<IEnumerable<LandmarkReadDTO>>(landmarks);

        //     _logger.LogInfo(
        //         $" Returning paginated {landmarksResponse.Count()} landmarks from db."
        //     );

        //     return Ok(landmarksResponse);
        // }

        // POST api/bookmarks/
        /// <summary>
        /// Save landmark {id} to current user bookmarks
        /// </summary>
        /// <response code="204">Landmark {id} saved to current user bookmarks</response>
        /// <response code="401">User not logged in</response>
        /// <response code="404">Landmark id not found</response>
        [HttpPost]
        public async Task<IActionResult> SaveLandmarkId([FromBody] LandmarkSaveDTO request)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($" User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingLandmark = await _repository.Landmark
                .GetLandmarkByIdAsync(request.LandmarkId);
            if (existingLandmark == null)
            {
                _logger.LogError($" Landmark {request.LandmarkId}, not found.");
                return NotFound("Landmark not found.");
            }

            var isLandmarkAlreadySaved = await _repository.LandmarkBookmark
                .GetUserResourceBookmarkIdAsync(userId, request.LandmarkId);
            if (isLandmarkAlreadySaved != null)
            {
                _logger.LogError($" Landmark {request.LandmarkId} already saved to user {userId}.");
                return BadRequest(" Landmark already saved");
            }

            var bookmarkCreated = await _repository.LandmarkBookmark.CreateBookmarkAsync(userId, request.LandmarkId);
            _repository.Landmark.CountLandmarkSaved(existingLandmark);

            await _repository.SaveAsync();


            _logger.LogInfo($"User {bookmarkCreated.UserId} saved landmark {bookmarkCreated.ResourceId}.");

            return Ok(); // TODO: return bookmark?
        }

        // DELETE api/bookmarks/5
        /// <summary>
        /// Unsaves landmark {id} to current user bookmarks
        /// </summary>
        /// <param name="LandmarkId">landmark ID</param>
        /// <response code="204">Landmark {id} saved to current user bookmarks</response>
        /// <response code="401">User not logged in</response>
        /// <response code="404">Landmark id not found</response>
        [HttpDelete("{LandmarkId}")]
        public async Task<IActionResult> UnsaveLandmarkId(string LandmarkId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingBookmark = await _repository.LandmarkBookmark.GetUserResourceBookmarkIdAsync(userId, LandmarkId);
            if (existingBookmark == null)
            {
                _logger.LogError($"Landmark id {LandmarkId}, not found or not saved by user {userId}.");
                return NotFound("Landmark id not saved.");
            }

            _repository.Landmark.CountLandmarkUnsaved(existingBookmark.Resource);
            _repository.LandmarkBookmark.RemoveBookmarkAsync(existingBookmark);

            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId} unsaved landmark {LandmarkId}.");

            return NoContent();
        }
    }
}