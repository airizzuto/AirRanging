using System.Collections.Generic;
using System.Threading.Tasks;
using API.Resources;
using API.Domain.Models;
using API.Domain.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;

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
        public async Task<IEnumerable<AircraftResource>> Get()
        {
            var aircrafts = await _aircraftService.GetAllAsync();
            var resources = _mapper.Map<IEnumerable<Aircraft>, IEnumerable<AircraftResource>>(aircrafts);

            return resources;
        }

        // GET api/aircrafts/5
        [HttpGet("{id}")]
        public async Task<AircraftResource> Get(int id)
        {
            var aircraft = await _aircraftService.FindAsync(id);
            var resource = _mapper.Map<Aircraft, AircraftResource>(aircraft);

            return resource;
        }

        // POST api/aircrafts
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SaveAircraftResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            var aircraft = _mapper.Map<SaveAircraftResource, Aircraft>(resource);
            var result = await _aircraftService.CreateAsync(aircraft);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var AircraftResource = _mapper.Map<Aircraft, AircraftResource>(result.Aircraft);
            return Ok(AircraftResource);
        }

        // PUT api/aircrafts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SaveAircraftResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            var aircraft = _mapper.Map<SaveAircraftResource, Aircraft>(resource);
            var result = await _aircraftService.UpdateAsync(id, aircraft);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var aircraftResource = _mapper.Map<Aircraft, AircraftResource>(result.Aircraft);

            return Ok(aircraftResource);
        }

        // DELETE api/aircrafts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _aircraftService.DeleteAsync(id);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var aircraftResource = _mapper.Map<Aircraft, AircraftResource>(result.Aircraft);
            return Ok(aircraftResource);
        }
    }
}