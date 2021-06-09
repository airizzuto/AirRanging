using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.V1.Aircraft;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using API.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using API.Extensions;
using System;
using System.Linq;
using API.Models.Pagination;
using API.Services;
using API.Helpers;
using API.Contracts.V1.Pagination;

namespace API.Controllers.V1
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    public class AircraftsController : ControllerBase
    {
        private readonly IAircraftRepository _repository;
        private readonly IMapper _mapper;
        private readonly IUriService _uriService;
        private readonly ILogger<AircraftsController> _logger;

        public AircraftsController(
            IAircraftRepository repository,
            IMapper mapper,
            ILogger<AircraftsController> logger,
            IUriService uriService)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _uriService = uriService;
        }

        // GET api/aircrafts
        /// <summary>
        /// Retrieves all aircrafts in the database
        /// </summary>
        /// <response code="200">Retrieves all aircrafts in the database</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAircrafts([FromQuery]PaginationQuery paginationQuery)
        {
            var pagination = _mapper.Map<PaginationFilter>(paginationQuery);
            var aircrafts = await _repository.GetAllAircraftsAsync(pagination);
            var aircraftsResponse = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            if (pagination == null || pagination.PageNumber < 1 || pagination.PageSize < 1)
            {
                _logger.LogInformation(
                    $"INFO: Returning {aircrafts.Count()} aircrafts from db");

                return Ok(new PagedResponse<AircraftReadDTO>(aircraftsResponse));
            }

            var paginationResponse = PaginationHelpers.CreatePaginatedResponse(_uriService, pagination, aircraftsResponse);

            return Ok(paginationResponse);
        }

        // GET api/aircrafts/5
        /// <summary>
        /// Retrieves aircraft {id} in the database
        /// </summary>
        /// <response code="200">Retrieves aircraft (id) in the database</response>
        /// <response code="404">Aircraft by (id) not found in the database</response>
        [HttpGet("{id}", Name="GetAircraftById")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAircraftById(Guid id)
        {
            var aircraft = await _repository.GetAircraftByIdAsync(id);
            if (aircraft == null)
            {
                return NotFound();
            }

            _logger.LogInformation($"INFO: Returning aircraft {id}");

            var resource = _mapper.Map<AircraftReadDTO>(aircraft);
            return Ok(resource);
        }

        // POST api/aircrafts
        /// <summary>
        /// Creates an aircraft in the database
        /// </summary>
        /// <response code="201">Aircraft created successfully in database</response>
        /// <response code="400">Unable to create the aircraft due to validation error</response>
        [HttpPost]
        public async Task<IActionResult> CreateAircraft(
            AircraftCreateDTO aircraftCreateDto)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return BadRequest(
                    new { Error = "Login to create aircraft"}
                );
            }

            aircraftCreateDto.UserId = userId;
            aircraftCreateDto.Username = HttpContext.GetUsername();
            var aircraftModel = _mapper.Map<Aircraft>(aircraftCreateDto);
            await _repository.CreateAircraftAsync(aircraftModel);
            await _repository.SaveChangesAsync();

            _logger.LogInformation($"INFO: User {aircraftModel.Username} created new aircraft");

            var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftModel);

            return CreatedAtRoute(
                nameof(GetAircraftById),
                new { aircraftReadDto.Id },
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
        public async Task<IActionResult> UpdateAircraft(
            Guid id, AircraftUpdateDTO aircraftUpdateDTO)
        {
            var existingAircraft = await _repository.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                return NotFound();
            }

            var userId = HttpContext.GetUserId();
            var userOwnsAircraft = await _repository.UserOwnsAircraftAsync(id, userId);
            if (!userOwnsAircraft)
            {
                return BadRequest(
                    new { Error = "Current user does not own this aircraft" }
                );
            }

            _mapper.Map(aircraftUpdateDTO, existingAircraft);

            _repository.UpdateAircraft(existingAircraft);
            await _repository.SaveChangesAsync();

            _logger.LogInformation($"INFO: User {aircraftUpdateDTO.Username} updated aircraft {id}");

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
            var existingAircraft = await _repository.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                return NotFound();
            }

            var userId = HttpContext.GetUserId();
            var userOwnsAircraft = await _repository.UserOwnsAircraftAsync(id, userId);
            if (!userOwnsAircraft)
            {
                return BadRequest(
                    new { Error = "Current user does not own this aircraft" }
                );
            }

            var aircraftToPatch = _mapper.Map<AircraftUpdateDTO>(existingAircraft);
            patchDocument.ApplyTo(aircraftToPatch, ModelState);

            if (!TryValidateModel(aircraftToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(aircraftToPatch, existingAircraft);

            _repository.UpdateAircraft(existingAircraft);
            await _repository.SaveChangesAsync();

            _logger.LogInformation($"INFO: User {existingAircraft.Username} partially updated aircraft {id}");

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
            var existingAircraft = await _repository.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                return NotFound();
            }

            var userId = HttpContext.GetUserId();
            var userOwnsAircraft = await _repository.UserOwnsAircraftAsync(id, userId);
            if (!userOwnsAircraft)
            {
                return BadRequest(
                    new { Error = "Current user does not own this aircraft" }
                );
            }

            _repository.DeleteAircraft(existingAircraft);
            await _repository.SaveChangesAsync();

            _logger.LogInformation($"INFO: User {existingAircraft.Username} deleted aircraft {id}");

            return NoContent();
        }

        // TODO: Filtering. And then sort by savescount
    }
}