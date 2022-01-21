using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using AutoMapper;
using Contracts;
using Logger;
using Entities.DTOs.V1.Landmarks;
using Entities.Models.Landmarks;

namespace App.Controllers.V1
{
    /// <summary>
    /// Landmark model controller endpoints:
    /// <para> GetAllLandmarks           - GET    -  api/landmarks            </para>
    /// <para> GetAllLandmarksPaginated  - GET    -  api/landmarks/paginated  </para>
    /// <para> SearchLandmarks           - GET    -  api/landmarks/all        </para>
    /// <para> GetLandmarkOwnedByUser    - GET    -  api/landmarks/owned      </para>
    /// <para> GetLandmarkSavedByUser    - GET    -  api/landmarks/saved      </para>
    /// <para> GetLandmarkId             - GET    -  api/landmarks/5          </para>
    /// <para> PartialUpdateLandmarkId   - PUT    -  api/landmarks/5          </para>
    /// <para> CreateLandmark            - POST   -  api/landmarks            </para>
    /// <para> CloneLandmarkId           - POST   -  api/landmarks/5/clone    </para>
    /// <para> FullUpdateLandmarkId      - PATCH  -  api/landmarks/5          </para>
    /// <para> DeleteLandmarkId          - DELETE -  api/landmarks/5          </para>
    /// </summary>

    [ApiController]
    [Route("/api/landmarks")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class LandmarksController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

    public LandmarksController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
    {
      _logger = logger;
      _repository = repository;
      _mapper = mapper;
    }
    
    // GET api/landmarks
        /// <summary>
        /// Retrieves all landmarks in the database
        /// </summary>
        /// <response code="200">Retrieves all landmarks in the database</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<LandmarkReadDTO>>> GetAllLandmarks()
        {
            var landmarks = await _repository.Landmark.GetAllLandmarksAsync();

            var landmarksResponse = _mapper.Map<IEnumerable<LandmarkReadDTO>>(landmarks);

            _logger.LogInfo(
                $"Returning all {landmarksResponse.Count()} landmarks from db."
            );

            return Ok(landmarksResponse);
        }

        // GET api/landmarks/paginated
        /// <summary>
        /// Retrieves all landmarks in the database
        /// </summary>
        /// <response code="200">Retrieves all landmarks in the database</response>
        [HttpGet("paginated")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<LandmarkReadDTO>>> GetAllLandmarksPaginated([FromQuery] LandmarkParameters parameters)
        {
            var landmarks = await _repository.Landmark.GetAllLandmarksAsync();

            var landmarksSorted = _repository.Landmark.SortLandmarks(landmarks, parameters);

            var landmarksPaginated = _repository.Landmark.PaginatedLandmarks(landmarksSorted, parameters);

            var landmarksResponse = _mapper.Map<IEnumerable<LandmarkReadDTO>>(landmarksPaginated);

            _logger.LogInfo(
                $"Returning all {landmarksResponse.Count()} landmarks from db."
            );

            return Ok(landmarksResponse);
        }

        // GET api/landmarks/search
        /// <summary>
        /// Retrieves all landmarks in the database
        /// </summary>
        /// <response code="200">Retrieves all landmarks in the database</response>
        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<LandmarkReadDTO>>> SearchLandmarks(
            [FromQuery] LandmarkParameters parameters)
        {
            var landmarks = await _repository.Landmark.GetAllLandmarksAsync();

            var landmarksFiltered = _repository.Landmark.FilterLandmarks(landmarks, parameters);

            var landmarksSorted = _repository.Landmark.SortLandmarks(
                landmarksFiltered, parameters
            );

            var landmarksPaginated = _repository.Landmark.PaginatedLandmarks(
                landmarksSorted, parameters
            );

            var metadata = new
            {
                landmarksPaginated.TotalCount,
                landmarksPaginated.PageSize,
                landmarksPaginated.CurrentPage,
                landmarksPaginated.TotalPages,
                landmarksPaginated.HasNext,
                landmarksPaginated.HasPrevious
            };

            Response.Headers.Add(
                "X-Pagination", JsonConvert.SerializeObject(metadata)
            );

            var landmarksResponse = _mapper.Map<IEnumerable<LandmarkReadDTO>>(landmarksPaginated);

            _logger.LogInfo(
                $" Returning search for all '{landmarksResponse.Count()}' landmarks."
            );

            return Ok(landmarksResponse);
        }
    // TODO: refactor endpoint to api/{userid}/landmark/[action]?
  }
}