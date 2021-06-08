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
        private readonly ILogger<AircraftsController> _logger;

        public AircraftsController(
            IAircraftRepository repository,
            IMapper mapper,
            ILogger<AircraftsController> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        // GET api/aircrafts
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AircraftReadDTO>>> GetAllAircrafts()
        {
            var aircrafts = await _repository.GetAllAircraftsAsync();

            _logger.LogInformation($"INFO: Returning {aircrafts.Count()} aircrafts from db");

            var resource = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);

            return Ok(resource);
        }

        // GET api/aircrafts/5
        [HttpGet("{id}", Name="GetAircraftById")]
        [AllowAnonymous]
        public async Task<ActionResult<AircraftReadDTO>> GetAircraftById(Guid id)
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
        [HttpPost]
        public async Task<ActionResult<AircraftReadDTO>> CreateAircraft(
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

            _logger.LogInformation($"INFO: {aircraftModel.Username} created new aircraft");

            var aircraftReadDto = _mapper.Map<AircraftReadDTO>(aircraftModel);

            return CreatedAtRoute(
                nameof(GetAircraftById),
                new { aircraftReadDto.Id },
                aircraftReadDto
            );
        }

        // PUT api/aircrafts/5
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

            _logger.LogInformation($"INFO: {aircraftUpdateDTO.Username} updated aircraft {id}");

            return NoContent();
        }

        // PATCH api/aircrafts/5
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

            _logger.LogInformation($"INFO: {existingAircraft.Username} partially updated aircraft {id}");

            return NoContent();
        }

        // DELETE api/aircrafts/5
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

            _logger.LogInformation($"INFO: {existingAircraft.Username} deleted aircraft {id}");

            return NoContent();
        }

        // TODO: Filtering. And then sort by savescount
    }
}