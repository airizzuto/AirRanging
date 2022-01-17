using AutoMapper;
using Contracts;
using Logger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public class LandmarksController
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
    
    // TODO: landmark controller
    // TODO: refactor endpoint to api/{userid}/landmark/[action]?
  }
}