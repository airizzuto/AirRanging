using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using API.Services;
using API.Helpers;
using API.Extensions;
using API.Contracts.V1.Pagination;
using API.Contracts.V1.Aircrafts;
using Entities.DTOs.V1.Aircraft;
using API.Services.Identity;
using Contracts;
using Repositories;
using Entities.Models;
using Entities.Models.Filters;

namespace API.Controllers.V1
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class AircraftsController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;
        private readonly IUriService _uriService;
        private readonly IUserService _userService;

        public AircraftsController(
            IUnitOfWork repository,
            IMapper mapper,
            ILoggerManager logger,
            IUriService uriService,
            IUserService userService)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _uriService = uriService;
            _userService = userService;
        }

        // GET api/aircrafts
        /// <summary>
        /// Retrieves all aircrafts in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<PagedResponse<AircraftReadDTO>>> GetAllAircraftsWithQuery(
            [FromQuery] GetAllAircraftsQuery query,
            [FromQuery] PaginationQuery paginationQuery)
        {
            try
            {
                var pagination = _mapper.Map<PaginationFilter>(paginationQuery);
                var filter = _mapper.Map<GetAllAircraftsFilter>(query);
                var aircrafts = await _repository.Aircraft.GetAllAircraftsWithQueryAsync(filter, pagination);
                var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

                if (pagination == null || pagination.PageNumber < 1 || pagination.PageSize < 1)
                {
                    _logger.LogInfo(
                        $"INFO: Returning {aircrafts.Count()} aircrafts from db.");

                    return Ok(new PagedResponse<AircraftReadDTO>(aircraftsResponse));
                }

                var paginationResponse = PaginationHelpers.CreatePaginatedResponse(_uriService, pagination, aircraftsResponse);

                _logger.LogInfo(
                        $"INFO: Returning paginated {paginationResponse.Data.Count()} aircrafts from db."
                );

                return Ok(paginationResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'GetAllAircraftsWithQuery' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET api/aircrafts/5
        /// <summary>
        /// Retrieves aircraft {id} in the database
        /// </summary>
        /// <response code="200">Retrieves aircraft (id) in the database</response>
        /// <response code="404">Aircraft (id) not found in the database</response>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<AircraftReadDTO>> GetAircraftById(Guid id)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'GetAircraftById' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST api/aircrafts
        /// <summary>
        /// Creates an aircraft in the database
        /// </summary>
        /// <response code="201">Aircraft created successfully in database</response>
        /// <response code="400">Unable to create the aircraft due to validation error</response>
        /// <response code="401">Unable to create the aircraft due to user not logged in</response>
        [HttpPost]
        public async Task<IActionResult> CreateAircraft(
            AircraftCreateDTO aircraftCreateDto)
        {
            try
            {
                var user = await _userService.GetUserAsync(HttpContext.GetUserId());
                if (user == null)
                {
                    _logger.LogError($"User not logged in. Unable to create aircraft.");
                    return BadRequest();
                }

                aircraftCreateDto.UserId = user.Id;;
                var aircraftModel = _mapper.Map<Aircraft>(aircraftCreateDto);
                _repository.Aircraft.CreateAircraft(aircraftModel);
                // await _repository.SaveToUserAsync(user.Id, aircraftModel.Id);
                await _repository.SaveAsync();

                var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftModel);

                _logger.LogInfo(
                    $"INFO: User {user.UserName} created aircraft {aircraftReadDto.Id}."
                );

                return CreatedAtRoute(
                    nameof(GetAircraftById),
                    aircraftReadDto.Id,
                    aircraftReadDto
                );
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'CreateAircraft' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT api/aircrafts/5
        /// <summary>
        /// Full update aircraft {id} in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="404">Aircraft id not found</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAircraft(
            Guid id, AircraftUpdateDTO aircraftUpdateDTO)
        {
            try
            {
                var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
                if (existingAircraft == null)
                {
                    _logger.LogError($"Aircraft id: {id}, not found.");
                    return NotFound();
                }

                var userId = HttpContext.GetUserId();
                var userOwnsAircraft = await _repository.Aircraft.UserOwnsAircraftAsync(id, userId);
                if (!userOwnsAircraft)
                {
                    _logger.LogError($"User does not own this aircraft. Unable to update.");
                    return BadRequest();
                }

                _mapper.Map(aircraftUpdateDTO, existingAircraft);

                _repository.Aircraft.UpdateAircraft(existingAircraft);
                await _repository.SaveAsync();

                _logger.LogInfo($"INFO: User {aircraftUpdateDTO.User.UserName} updated aircraft {id}.");

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'UpdateAircraft' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // PATCH api/aircrafts/5
        /// <summary>
        /// Partial update aircraft {id} in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="404">Aircraft id not found</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        [HttpPatch("{id}")]
        public async Task<IActionResult> PartialUpdateAircraft(
            Guid id, JsonPatchDocument<AircraftUpdateDTO> patchDocument)
        {
            try
            {
                var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
                if (existingAircraft == null)
                {
                    _logger.LogError($"Aircraft id: {id}, not found.");
                    return NotFound();
                }

                var userId = HttpContext.GetUserId();
                var userOwnsAircraft = await _repository.Aircraft.UserOwnsAircraftAsync(id, userId);
                if (!userOwnsAircraft)
                {
                    _logger.LogError($"User does not own this aircraft. Unable to update.");
                    return BadRequest();
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
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'PartialUpdateAircraft' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE api/aircrafts/5
        /// <summary>
        /// Delete aircraft {id} from database
        /// </summary>
        /// <response code="204">Aircraft deleted successfully from database</response>
        /// <response code="404">Aircraft id not found</response>
        /// <response code="400">User id does not own this aircraft</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAircraft(Guid id)
        {
            try
            {
                var existingAircraft = await _repository.Aircraft.GetAircraftByIdAsync(id);
                if (existingAircraft == null)
                {
                    return NotFound();
                }

                var userId = HttpContext.GetUserId();
                var userOwnsAircraft = await _repository.Aircraft.UserOwnsAircraftAsync(id, userId);
                if (!userOwnsAircraft)
                {
                    _logger.LogError($"User does not own this aircraft. Unable to delete.");
                    return BadRequest();
                }

                _repository.Aircraft.DeleteAircraft(existingAircraft);
                await _repository.SaveAsync();

                _logger.LogInfo($"INFO: User {existingAircraft.User.UserName} deleted aircraft {id}.");

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside 'DeleteAircraft' action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}