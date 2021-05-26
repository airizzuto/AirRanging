using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.Aircraft;
using API.Domain.Models;
using API.Domain.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using Microsoft.AspNetCore.JsonPatch;

namespace API.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class AircraftsController : ControllerBase
    {
        private readonly IAircraftService _aircraftService;
        private readonly IMapper _mapper;

        public AircraftsController(IAircraftService aircraftService, IMapper mapper)
        {
            _aircraftService = aircraftService;
            _mapper = mapper;
        }

        // GET api/aircrafts
        [HttpGet]
        public async Task<IEnumerable<AircraftReadDTO>> GetAllAircrafts()
        {
            var aircrafts = await _aircraftService.GetAllAsync();
            var resources = _mapper.Map<IEnumerable<Aircraft>, IEnumerable<AircraftReadDTO>>(aircrafts);

            return resources;
        }

        // GET api/aircrafts/5
        [HttpGet("{id}")]
        public async Task<AircraftReadDTO> GetAircraftById(int id)
        {
            var aircraft = await _aircraftService.FindAsync(id);
            var resource = _mapper.Map<Aircraft, AircraftReadDTO>(aircraft);

            return resource;
        }

        // POST api/aircrafts
        [HttpPost]
        public async Task<IActionResult> CreateAircraft([FromBody] AircraftCreateDTO resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            var aircraft = _mapper.Map<AircraftCreateDTO, Aircraft>(resource);
            var result = await _aircraftService.CreateAsync(aircraft);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var AircraftResource = _mapper.Map<Aircraft, AircraftCreateDTO>(result.Aircraft);
            return Ok(AircraftResource);
        }

        // PUT api/aircrafts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAircraft(int id, [FromBody] AircraftUpdateDTO resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            var aircraft = _mapper.Map<AircraftUpdateDTO, Aircraft>(resource);
            var result = await _aircraftService.UpdateAsync(id, aircraft);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var aircraftResource = _mapper.Map<Aircraft, AircraftReadDTO>(result.Aircraft);

            return Ok(aircraftResource);
        }

        // PATCH api/aircrafts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PartialUpdateAircraft(
            int id, JsonPatchDocument<AircraftUpdateDTO> patchDocument)
        {
            var existingAircraft = await _aircraftService.FindAsync(id);
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

            var resource = _mapper.Map(aircraftToPatch, existingAircraft);

            await _aircraftService.PartialUpdateAsync(resource);
            
            return NoContent();
        }

        // DELETE api/aircrafts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAircraft(int id)
        {
            var result = await _aircraftService.DeleteAsync(id);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return NoContent();
        }
    }
}