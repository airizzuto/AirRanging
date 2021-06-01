using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.V1.Aircraft;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using API.Data.Repositories;

namespace API.Controllers.V1
{
    [ApiController]
    [Route("/api/[controller]")]
    [ApiVersion("1.0")]
    public class AircraftsController : ControllerBase
    {
        private readonly IAircraftRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;  // TODO: logger implementation

        public AircraftsController(
            IAircraftRepository repository, IMapper mapper, ILogger<AircraftsController> logger)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        // GET api/aircrafts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AircraftReadDTO>>> GetAllAircrafts()
        {
            var aircrafts = await _repository.GetAllAircraftsAsync();

            var resource = _mapper.Map<IEnumerable<AircraftReadDTO>>(aircrafts);
            return Ok(resource);
        }

        // GET api/aircrafts/5
        [HttpGet("{id}", Name="GetAircraftById")]
        public async Task<ActionResult<AircraftReadDTO>> GetAircraftById(int id)
        {
            var aircraft = await _repository.GetAircraftByIdAsync(id);
            if (aircraft == null)
            {
                return NotFound();
            }

            var resource = _mapper.Map<AircraftReadDTO>(aircraft);
            return Ok(resource);
        }

        // POST api/aircrafts
        [HttpPost]
        public async Task<ActionResult<AircraftReadDTO>> CreateAircraft(
            AircraftCreateDTO aircraftCreateDto)
        {
            var aircraftModel = _mapper.Map<Aircraft>(aircraftCreateDto);
            await _repository.CreateAircraftAsync(aircraftModel);
            await _repository.SaveChangesAsync();

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
            int id, AircraftUpdateDTO aircraftUpdateDTO)
        {
            var existingAircraft = await _repository.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                return NotFound();
            }

            _mapper.Map(aircraftUpdateDTO, existingAircraft);

            _repository.UpdateAircraft(existingAircraft);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PATCH api/aircrafts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PartialUpdateAircraft(
            int id, JsonPatchDocument<AircraftUpdateDTO> patchDocument)
        {
            var existingAircraft = await _repository.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                return NotFound();
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

            return NoContent();
        }

        // DELETE api/aircrafts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAircraft(int id)
        {
            var existingAircraft = await _repository.GetAircraftByIdAsync(id);
            if (existingAircraft == null)
            {
                return NotFound();
            }

            _repository.DeleteAircraft(existingAircraft);
            await _repository.SaveChangesAsync();

            return NoContent();
        }
    
        // TODO: filter query
    
    }
}