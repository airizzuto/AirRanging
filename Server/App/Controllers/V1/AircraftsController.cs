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
    /// <para> GetAircraftId             - GET    -  api/aircrafts/5          </para>
    /// <para> PartialUpdateAircraftId   - PUT    -  api/aircrafts/5          </para>
    /// <para> CreateAircraft            - POST   -  api/aircrafts            </para>
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
                $"Returning all {aircraftsResponse.Count()} aircrafts from db."
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
                $" Returning all paginated {aircraftsResponse.Count()} aircrafts from db."
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
                $" Returning all search paginated {aircraftsResponse.Count()} aircrafts from db."
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
                _logger.LogError($" User not logged in.");

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
                $" Returning owned paginated {aircraftsResponse.Count()} aircrafts from db."
            );

            return Ok(aircraftsResponse);
        }

        // GET api/aircrafts/5
        /// <summary>
        /// Retrieves aircraft ID in the database
        /// </summary>
        /// <response code="200">Retrieves aircraft (id) in the database</response>
        /// <response code="404">Aircraft (id) not found in the database</response>
        [HttpGet("{aircraftId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAircraftById(string aircraftId)
        {
            var aircraft = await _repository.Aircraft.GetAircraftByIdAsync(aircraftId);
            if (aircraft == null)
            {
                _logger.LogError($" Aircraft id {aircraftId} not found.");
                return NotFound("Aircraft id not found.");
            }

            _logger.LogInfo($" Returning aircraft {aircraftId}.");

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
        [HttpPost]
        public async Task<IActionResult> CreateAircraft(AircraftCreateDTO aircraftCreateDto)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($" User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var aircraftModel = _mapper.Map<Aircraft>(aircraftCreateDto);

            await _repository.Aircraft.CreateAircraftAsync(aircraftModel, userId);
            await _repository.Bookmark.CreateBookmarkAsync(userId, aircraftModel.Id);

            await _repository.SaveAsync();

            var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftModel);

            _logger.LogInfo(
                $" User: {userId} created aircraft {aircraftReadDto.Id}."
            );

            return CreatedAtAction(
                actionName: nameof(GetAircraftById),
                routeValues: new { aircraftId = aircraftReadDto.Id },
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
        [HttpPost("{aircraftId}/clone")]
        public async Task<IActionResult> CloneAircraft(string aircraftId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($" User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(aircraftId);
            if (existingAircraft == null)
            {
                _logger.LogError($" Aircraft {aircraftId} not found.");
                return NotFound("Aircraft id not found.");
            }

            var aircraftCopy = await _repository.Aircraft.CreateAircraftAsync(existingAircraft, userId);
            await _repository.Bookmark.CreateBookmarkAsync(userId, aircraftCopy.Id);

            await _repository.SaveAsync();

            var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftCopy);

            _logger.LogInfo(
                $" User: {userId} cloned {aircraftId}. New aircraft {aircraftReadDto.Id}."
            );

            return CreatedAtAction(
                actionName: nameof(GetAircraftById),
                routeValues: new { aircraftId = aircraftReadDto.Id },
                value: aircraftReadDto
            );
        }

        // PUT api/aircrafts/5
        /// <summary>
        /// Full update aircraft ID.
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        /// <response code="401">User not logged in</response>
        /// <response code="403">User does not own this aircraft</response>
        /// <response code="404">Aircraft ID not found</response>
        [HttpPut("{aircraftId}")]
        public async Task<IActionResult> UpdateAircraft(string aircraftId, AircraftUpdateDTO aircraftUpdateDTO)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($" User not logged in.");
                return Unauthorized("User not logged in.");
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(aircraftId);
            if (existingAircraft == null)
            {
                _logger.LogError($" Aircraft id {aircraftId}, not found.");
                return NotFound("Aircraft id not found.");
            }

            if (existingAircraft.UserId != userId)
            {
                _logger.LogError($" User does not own this aircraft. Unable to update.");
                return Forbid("User does not own this aircraft. Unable to update.");
            }

            _mapper.Map(aircraftUpdateDTO, existingAircraft);

            _repository.Aircraft.UpdateAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo($"User {userId} updated aircraft {aircraftId}.");

            return NoContent();
        }

        // PATCH api/aircrafts/5
        /// <summary>
        /// Partial update aircraft ID in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        /// <response code="401">User not logged in.</response>
        /// <response code="403">User does not own this aircraft.</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPatch("{aircraftId}")]
        public async Task<IActionResult> PartialUpdateAircraft(
            string aircraftId, JsonPatchDocument<AircraftUpdateDTO> patchDoc)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in.");
                return Unauthorized();
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(aircraftId);
            if (existingAircraft == null)
            {
                _logger.LogError($" Aircraft {aircraftId} not found.");
                return NotFound("Aircraft not found.");
            }

            if (existingAircraft.UserId != userId)
            {
                _logger.LogError($" User does not own this aircraft. Unable to update.");
                return Forbid("User does not own this aircraft. Unable to update.");
            }

            var aircraftToPatch = _mapper.Map<AircraftUpdateDTO>(existingAircraft);
            patchDoc.ApplyTo(aircraftToPatch, ModelState);

            if (!TryValidateModel(aircraftToPatch))
            {
                _logger.LogError($" Validating aircraft update.");
                return ValidationProblem(ModelState);
            }

            _mapper.Map(aircraftToPatch, existingAircraft);

            _repository.Aircraft.UpdateAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo(
                $" User {userId} partially updated aircraft {aircraftId}.");

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
        [HttpDelete("{aircraftId}")]
        public async Task<IActionResult> DeleteAircraft(string aircraftId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($" User not logged in. Unable to delete aircraft.");
                return Unauthorized();
            }

            var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(aircraftId);
            if (existingAircraft == null)
            {
                return NotFound("Aircraft id not found.");
            }

            if (existingAircraft.UserId != userId)
            {
                _logger.LogError(" User does not own this aircraft. Unable to delete aircraft.");
                return Forbid("User does not own this aircraft. Unable to delete aircraft.");
            }

            _repository.Aircraft.DeleteAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo($" User {userId} deleted aircraft {aircraftId}.");

            return NoContent();
        }
    }
}