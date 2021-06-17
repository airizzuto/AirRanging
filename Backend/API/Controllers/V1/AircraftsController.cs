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
using API.Extensions;
using API.Services.Identity;
using Contracts;
using Entities.Models.Aircrafts;
using Entities.DTOs.V1.Aircrafts;
using Newtonsoft.Json;

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
        private readonly IUserService _userService;

        public AircraftsController(
            IUnitOfWork repository,
            IMapper mapper,
            ILoggerManager logger,
            IUserService userService)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _userService = userService;
        }

        // GET api/aircrafts
        /// <summary>
        /// Retrieves all aircrafts in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AircraftReadDTO>>> GetAllAircrafts(
            [FromQuery] AircraftParameters aircraftParameters)
        {
            var aircrafts = await _repository.Aircraft
                .GetAircraftsAsync(aircraftParameters);

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

        [HttpGet("/owned")]
        public async Task<ActionResult<IEnumerable<AircraftReadDTO>>> GetOwnedAircrafts(
            [FromQuery] AircraftParameters parameters)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                _logger.LogError($"User not logged in. Unable to create aircraft.");

                return Unauthorized();
            }

            var aircrafts = await _repository.Aircraft.GetAircraftsOwned(userId, parameters);

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

        // POST api/aircrafts
        /// <summary>
        /// Creates an aircraft in the database
        /// </summary>
        /// <response code="201">Aircraft created successfully in database</response>
        /// <response code="400">Unable to create the aircraft due to validation error</response>
        /// <response code="401">Unable to create the aircraft due to user not logged in</response>
        [HttpPost]
        public async Task<IActionResult> CreateAircraft(AircraftCreateDTO aircraftCreateDto)
        {
            var user = await _userService.GetUserAsync(HttpContext.GetUserId());
            if (user == null)
            {
                _logger.LogError($"User not logged in. Unable to create aircraft.");
                return BadRequest();
            }

            aircraftCreateDto.UserId = user.Id; ;
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

        // PUT api/aircrafts/5
        /// <summary>
        /// Full update aircraft {id} in the database
        /// </summary>
        /// <response code="204">Aircraft updated successfully in database</response>
        /// <response code="404">Aircraft id not found</response>
        /// <response code="400">Unable to update the aircraft due to validation error</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAircraft(Guid id, AircraftUpdateDTO aircraftUpdateDTO)
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
    }
}