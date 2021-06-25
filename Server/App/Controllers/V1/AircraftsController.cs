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
using Contracts;

namespace App.Controllers.V1
{
    /// <summary>
    /// Aircraft model controller endpoints:
    /// <para> GetAllAircraft              - GET     api/aircrafts               </para>
    /// <para> GetAircraftByParameters     - GET     api/aircrafts/search        </para>
    /// <para> GetAircraftOwnedByUser      - GET     api/aircrafts/owned         </para>
    /// <para> GetAircraftId               - GET     api/aircrafts/id/5          </para>
    /// <para> CreateAircraft              - POST    api/aircrafts/create        </para>
    /// <para> PartialUpdateAircraftId     - PUT     api/aircrafts/id/5          </para>
    /// <para> FullUpdateAircraftId        - PATCH   api/aircrafts/id/5          </para>
    /// <para> DeleteAircraftId            - DELETE  api/aircrafts/id/5          </para>
    /// </summary>
    [ApiController]
    [Route("/api/aircrafts")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class AircraftsController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IApplicationUserService _userService;
        private readonly IMapper _mapper;

        public AircraftsController(
            ILoggerManager logger,
            IRepositoryWrapper repository,
            IApplicationUserService userService,
            IMapper mapper
            )
        {
            _logger = logger;
            _repository = repository;
            _userService = userService;
            _mapper = mapper;
        }

        // GET api/aircrafts
        /// <summary>
        /// Retrieves all aircrafts in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AircraftReadDTO>>> GetAircrafts(
            [FromQuery] AircraftParameters aircraftParameters)
        {
            var aircrafts = await _repository.Aircraft
                .GetAllAircraftsAsync(aircraftParameters);

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
                $"INFO: Returning paginated {aircraftsResponse.Count()} aircrafts from db."
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
                $"INFO: Returning search paginated {aircraftsResponse.Count()} aircrafts from db."
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
                _logger.LogError($"User not logged in. Unable to retrieve user aircrafts.");

                return Unauthorized();
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
                $"INFO: Returning paginated {aircraftsResponse.Count()} aircrafts from db."
            );

            return Ok(aircraftsResponse);
        }

        // GET api/aircrafts/id/5
        /// <summary>
        /// Retrieves aircraft {id} in the database
        /// </summary>
        /// <response code="200">Retrieves aircraft (id) in the database</response>
        /// <response code="404">Aircraft (id) not found in the database</response>
        [HttpGet("id/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAircraftById(Guid id)
        {
            var aircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
            if (aircraft == null)
            {
                _logger.LogError($"Aircraft id: {id}, not found.");
                return NotFound();
            }

            _logger.LogInfo($"INFO: Returning aircraft {id}.");

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
                _logger.LogError($"User not logged in. Unable to create aircraft.");
                return Unauthorized();
            }

            var aircraftModel = _mapper.Map<Aircraft>(aircraftCreateDto);

            aircraftModel.User = await _userService.GetUserAsync(userId);
            aircraftModel.AuthorUsername = aircraftModel.User.UserName;

            await _repository.Aircraft.CreateAircraftAsync(aircraftModel);

            await _repository.Bookmark.SaveToBookmarkAsync(userId, aircraftModel.Id);
            await _repository.SaveAsync();

            var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftModel);

            _logger.LogInfo(
                $"INFO: User: {aircraftReadDto.AuthorUsername} created aircraft {aircraftReadDto.Id}."
            );

            return CreatedAtAction(
                actionName: nameof(GetAircraftById),
                routeValues: new { id = aircraftReadDto.Id },
                value: aircraftReadDto
            );
        }

        // PUT api/aircrafts/id/5
        /// <summary>
        /// Full update aircraft {id} in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        /// <response code="401">User not logged in.</response>
        /// <response code="403">User does not own this aircraft.</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPut("id/{id}")]
        public async Task<IActionResult> UpdateAircraft(Guid id, AircraftUpdateDTO aircraftUpdateDTO)
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
                _logger.LogError($"Aircraft id: {id}, not found.");
                return NotFound();
            }

            var userOwnsAircraft = await _repository.Aircraft.UserOwnsAircraftAsync(id, userId);
            if (!userOwnsAircraft)
            {
                _logger.LogError($"User does not own this aircraft. Unable to update.");
                return Forbid();
            }

            _mapper.Map(aircraftUpdateDTO, existingAircraft);

            _repository.Aircraft.UpdateAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo($"INFO: User {aircraftUpdateDTO.User.UserName} updated aircraft {id}.");

            return NoContent();
        }

        // PATCH api/aircrafts/id/5
        /// <summary>
        /// Partial update aircraft {id} in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        /// <response code="401">User not logged in.</response>
        /// <response code="403">User does not own this aircraft.</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpPatch("id/{id}")]
        public async Task<IActionResult> PartialUpdateAircraft(
            Guid id, JsonPatchDocument<AircraftUpdateDTO> patchDocument)
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
                _logger.LogError($"Aircraft id: {id}, not found.");
                return NotFound();
            }

            if (existingAircraft.UserId != userId)
            {
                _logger.LogError($"User does not own this aircraft. Unable to update.");
                return Forbid();
            }

            var aircraftToPatch = _mapper.Map<AircraftUpdateDTO>(existingAircraft);
            patchDocument.ApplyTo(aircraftToPatch, ModelState);

            if (!TryValidateModel(aircraftToPatch))
            {
                _logger.LogError($"Validation error updating aircraft {aircraftToPatch.Id}.");
                return ValidationProblem(ModelState);
            }

            _mapper.Map(aircraftToPatch, existingAircraft);

            _repository.Aircraft.UpdateAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo($"INFO: User {existingAircraft.User.UserName} partially updated aircraft {id}.");

            return NoContent();
        }

        // DELETE api/aircrafts/id/5
        /// <summary>
        /// Delete aircraft {id} from database
        /// </summary>
        /// <response code="204">Aircraft deleted successfully from database</response>
        /// <response code="401">User not logged in.</response>
        /// <response code="403">User does not own this aircraft.</response>
        /// <response code="404">Aircraft id not found</response>
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteAircraft(Guid id)
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
                return NotFound();
            }

            var userOwnsAircraft = await _repository.Aircraft.UserOwnsAircraftAsync(id, userId);
            if (!userOwnsAircraft)
            {
                _logger.LogError($"User does not own this aircraft. Unable to delete.");
                return Forbid();
            }

            _repository.Aircraft.DeleteAircraft(existingAircraft);
            await _repository.SaveAsync();

            _logger.LogInfo($"INFO: User {existingAircraft.User.UserName} deleted aircraft {id}.");

            return NoContent();
        }
    }
}