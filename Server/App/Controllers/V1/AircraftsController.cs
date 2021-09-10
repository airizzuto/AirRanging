using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using Newtonsoft.Json;
using App.Extensions;
using Entities.Models.Aircrafts;
using Entities.DTOs.V1.Aircrafts;
using Logger;
using Contracts;

namespace App.Controllers.V1
{
    /// <summary>
    /// Aircraft model controller endpoints:
    /// <para> GetAllAircrafts           - GET    -  api/aircrafts            </para>
    /// <para> GetAllAircraftsPaginated  - GET    -  api/aircrafts/paginated  </para>
    /// <para> GetAircraftByParameters   - GET    -  api/aircrafts/search     </para>
    /// <para> GetAircraftOwnedByUser    - GET    -  api/aircrafts/owned      </para>
    /// <para> GetAircraftSavedByUser    - GET    -  api/aircrafts/saved      </para>
    /// <para> GetAircraftId             - GET    -  api/aircrafts/5          </para>
    /// <para> CreateAircraft            - POST   -  api/aircrafts/create     </para>
    /// <para> PartialUpdateAircraftId   - PUT    -  api/aircrafts/5          </para>
    /// <para> SaveAircraftId            - PUT    -  api/aircrafts/5/save     </para>
    /// <para> UnsaveAircraftId          - DELETE -  api/aircrafts/5/unsave   </para>
    /// <para> CloneAircraftId           - POST   -  api/aircrafts/5/clone    </para>
    /// <para> FullUpdateAircraftId      - PATCH  -  api/aircrafts/5          </para>
    /// <para> DeleteAircraftId          - DELETE -  api/aircrafts/5          </para>
    /// </summary>

    [ApiController]
    [Route("/api/aircrafts")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class AircraftsController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public AircraftsController(
            ILoggerManager logger,
            IRepositoryWrapper repository,
            IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        // GET api/aircrafts
        /// <summary>
        /// Retrieves all aircrafts in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<AircraftReadDTO>> GetAllAircrafts(
            [FromQuery] AircraftParameters aircraftParameters)
        {
            var aircrafts = _repository.Aircraft
                .GetAllAircrafts(aircraftParameters);

            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            _logger.LogInfo(
                $"Returning {aircraftsResponse.Count()} aircrafts from db."
            );

            return Ok(aircraftsResponse);
        }

        // GET api/aircrafts/paginated
        /// <summary>
        /// Retrieves all aircrafts in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        [HttpGet("paginated")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AircraftReadDTO>>> GetAllAircraftsPaginated(
            [FromQuery] AircraftParameters aircraftParameters)
        {
            var aircrafts = await _repository.Aircraft
                .GetAllAircraftsPaginatedAsync(aircraftParameters);

            var metadata = new
            {
                aircrafts.TotalCount,
                aircrafts.PageSize,
                aircrafts.CurrentPage,
                aircrafts.TotalPages,
                aircrafts.HasNext,
                aircrafts.HasPrevious
            };

            Response.Headers.Add(
                "X-Pagination", JsonConvert.SerializeObject(metadata)
            );

            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            _logger.LogInfo(
                $"Returning paginated {aircraftsResponse.Count()} aircrafts from db."
            );

            return Ok(aircraftsResponse);
        }

        // GET api/aircrafts/search
        /// <summary>
        /// Retrieves all aircrafts in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AircraftReadDTO>>> SearchAircrafts(
            [FromQuery] AircraftParameters aircraftParameters)
        {
            var aircrafts = await _repository.Aircraft
                .GetAircraftsWithSearchAsync(aircraftParameters);

            var metadata = new
            {
                aircrafts.TotalCount,
                aircrafts.PageSize,
                aircrafts.CurrentPage,
                aircrafts.TotalPages,
                aircrafts.HasNext,
                aircrafts.HasPrevious
            };

            Response.Headers.Add(
                "X-Pagination", JsonConvert.SerializeObject(metadata)
            );

            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            _logger.LogInfo(
                $"Returning search paginated {aircraftsResponse.Count()} aircrafts from db."
            );

            return Ok(aircraftsResponse);
        }

        // GET api/aircrafts/owned
        /// <summary>
        /// Retrieves aircrafts created by user.
        /// </summary>
        /// <response code="200">Aircrafts retrieved successfully</response>
        /// <response code="401">User not logged in. Unable to retrieve user aircrafts</response>
        [HttpGet("owned")]
        public async Task<IActionResult> GetOwnedAircrafts(
            [FromQuery] AircraftParameters parameters)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");

                return Unauthorized("User not logged in.");
            }

            var aircrafts = await _repository.Aircraft.GetAircraftsOwnedAsync(userId, parameters);

            var metadata = new
            {
                aircrafts.TotalCount,
                aircrafts.PageSize,
                aircrafts.CurrentPage,
                aircrafts.TotalPages,
                aircrafts.HasNext,
                aircrafts.HasPrevious
            };

            Response.Headers.Add(
                "X-Pagination", JsonConvert.SerializeObject(metadata)
            );

            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            _logger.LogInfo(
                $" Returning paginated {aircraftsResponse.Count()} aircrafts from db."
            );

            return Ok(aircraftsResponse);
        }

        // GET api/aircrafts/5
        /// <summary>
        /// Retrieves aircraft {id} in the database
        /// </summary>
        /// <response code="200">Retrieves aircraft (id) in the database</response>
        /// <response code="404">Aircraft (id) not found in the database</response>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAircraftById(Guid id)
        {
            var aircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
            if (aircraft == null)
            {
                _logger.LogError($"Aircraft id {id} not found.");
                return NotFound("Aircraft id not found.");
            }

            _logger.LogInfo($"Returning aircraft {id}.");

            var resource = _mapper.Map<AircraftReadDTO>(aircraft);
            return Ok(resource);
        }

        // POST api/aircrafts/create
        /// <summary>
        /// Creates an aircraft in the database
        /// </summary>
        /// <response code="201">Aircraft created successfully in database</response>
        /// <response code="400">Unable to create the aircraft due to validation error</response>
        /// <response code="401">Unable to create the aircraft due to user not logged in</response>
        [HttpPost("create")]
        public async Task<IActionResult> CreateAircraft(AircraftCreateDTO aircraftCreateDto)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"user not logged in.");
                return Unauthorized("User not logged in.");
            }

            var aircraftModel = _mapper.Map<Aircraft>(aircraftCreateDto);

            await _repository.Aircraft.CreateAircraftAsync(aircraftModel, userId);
            await _repository.Bookmark.SaveToBookmarkAsync(userId, aircraftModel.Id);

            await _repository.SaveAsync();

            var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftModel);

            _logger.LogInfo(
                $" User: {userId} created aircraft {aircraftReadDto.Id}."
            );

            return CreatedAtAction(
                actionName: nameof(GetAircraftById),
                routeValues: new { id = aircraftReadDto.Id },
                value: aircraftReadDto
            );
        }

        // POST api/aircrafts/5/clone
        /// <summary>
        /// Creates a copy of an existing aircraft in the database referenced to user ID.
        /// </summary>
        /// <param name="aircraftId">Aircraft ID</param>
        /// <response code="201">Aircraft cloned successfully in database</response>
        /// <response code="400">Unable to clone the aircraft due to validation error</response>
        /// <response code="401">Unable to clone the aircraft due to user not logged in</response>
        /// <response code="404">Aircraft ID not found.</response>
        [HttpPost("{id}/clone")]
        public async Task<IActionResult> CloneAircraft(Guid aircraftId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"user not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(aircraftId);
            if (existingAircraft == null)
            {
                _logger.LogError($"Aircraft {aircraftId} not found.");
                return NotFound("Aircraft id not found.");
            }
           
            var aircraftCopy = await _repository.Aircraft.CreateAircraftAsync(existingAircraft, userId);
            await _repository.Bookmark.SaveToBookmarkAsync(userId, aircraftCopy.Id);

            await _repository.SaveAsync();

            var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftCopy);

            _logger.LogInfo(
                $" User: {userId} created aircraft {aircraftReadDto.Id}."
            );

            return CreatedAtAction(
                actionName: nameof(GetAircraftById),
                routeValues: new { id = aircraftReadDto.Id },
                value: aircraftReadDto
            );
        }

        // PUT api/aircrafts/5
        /// <summary>
        /// Full update aircraft {id} in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        /// <response code="401">User not logged in</response>
        /// <response code="403">User does not own this aircraft</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAircraft(Guid id, AircraftUpdateDTO aircraftUpdateDTO)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                _logger.LogError($"Aircraft id {id}, not found.");
                return NotFound("Aircraft id not found.");
            }

            if (existingAircraft.UserId != userId)
            {
                _logger.LogError($"User does not own this aircraft. Unable to update.");
                return Forbid("User does not own this aircraft. Unable to update.");
            }

            _mapper.Map(aircraftUpdateDTO, existingAircraft);

            _repository.Aircraft.UpdateAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId} updated aircraft {id}.");

            return NoContent();
        }

        // PUT api/aircrafts/5/save
        /// <summary>
        /// Save aircraft {id} to current user bookmarks
        /// </summary>
        /// <response code="204">Aircraft {id} saved to current user bookmarks</response>
        /// <response code="401">User not logged in</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPut("{id}/save")]
        public async Task<IActionResult> SaveAircraftId(Guid id)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                _logger.LogError($"Aircraft id {id}, not found.");
                return NotFound("Aircraft id not found.");
            }

            await _repository.Bookmark.SaveToBookmarkAsync(userId, existingAircraft.Id);
            _repository.Aircraft.CountAircraftSaved(existingAircraft);

            await _repository.SaveAsync();

            var aircraftResponse = _mapper.Map<AircraftReadDTO>(existingAircraft);

            _logger.LogInfo($"User {userId} saved aircraft {aircraftResponse.Id}.");

            return Ok(aircraftResponse);
        }

        // DELETE api/aircrafts/5/unsave
        /// <summary>
        /// Unsaves aircraft {id} to current user bookmarks
        /// </summary>
        /// <param name="aircraftId">aircraft ID</param>
        /// <response code="204">Aircraft {id} saved to current user bookmarks</response>
        /// <response code="401">User not logged in</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPut("{id}/unsave")]
        public async Task<IActionResult> UnsaveAircraftId(Guid aircraftId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingAircraft = await _repository.Bookmark.GetBookmarkIdAsync(userId, aircraftId);
            if (existingAircraft == null)
            {
                _logger.LogError($"Aircraft id {aircraftId}, not found or not saved by user {userId}.");
                return NotFound("Aircraft id not saved.");
            }

            _repository.Bookmark.RemoveBookmarkAsync(userId, existingAircraft.Id);
            _repository.Aircraft.CountAircraftUnsaved(existingAircraft);

            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId} saved aircraft {aircraftId}.");

            return NoContent();
        }

        // PATCH api/aircrafts/5
        /// <summary>
        /// Partial update aircraft {id} in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        /// <response code="401">User not logged in.</response>
        /// <response code="403">User does not own this aircraft.</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPatch("{id}")]
        public async Task<IActionResult> PartialUpdateAircraft(
            Guid id, JsonPatchDocument<AircraftUpdateDTO> patchDoc)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");
                return Unauthorized();
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                _logger.LogError($"Aircraft {id} not found.");
                return NotFound("Aircraft not found.");
            }

            if (existingAircraft.UserId != userId)
            {
                _logger.LogError($"User does not own this aircraft. Unable to update.");
                return Forbid("User does not own this aircraft. Unable to update.");
            }

            var aircraftToPatch = _mapper.Map<AircraftUpdateDTO>(existingAircraft);
            patchDoc.ApplyTo(aircraftToPatch, ModelState);

            if (!TryValidateModel(aircraftToPatch))
            {
                _logger.LogError($"Validating aircraft update.");
                return ValidationProblem(ModelState);
            }

            _mapper.Map(aircraftToPatch, existingAircraft);

            _repository.Aircraft.UpdateAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo(
                $" User {userId} partially updated aircraft {id}.");

            return NoContent();
        }

        // DELETE api/aircrafts/5
        /// <summary>
        /// Delete aircraft {id} from database
        /// </summary>
        /// <response code="204">Aircraft deleted successfully from database</response>
        /// <response code="401">User not logged in.</response>
        /// <response code="403">User does not own this aircraft.</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAircraft(Guid id)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to delete aircraft.");
                return Unauthorized();
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                return NotFound("Aircraft id not found.");
            }

            if (existingAircraft.UserId != userId)
            {
                _logger.LogError("User does not own this aircraft. Unable to delete aircraft.");
                return Forbid("User does not own this aircraft. Unable to delete aircraft.");
            }

            _repository.Aircraft.DeleteAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId} deleted aircraft {id}.");

            return NoContent();
        }
    }
}