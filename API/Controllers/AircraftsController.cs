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
    public async Task<IEnumerable<GetAircraftResource>> GetAllAsync()
    {
        var aircrafts = await _aircraftService.GetAllAircraftsAsync();
        var resources = _mapper.Map<IEnumerable<Aircraft>, IEnumerable<GetAircraftResource>>(aircrafts);

        return resources;
    }

    // GET api/aircrafts/5
    [HttpGet("{id}")]
    public async Task<GetAircraftResource> GetIdAsync(int id)
    {
      var aircraft = await _aircraftService.GetAircraftByIdAsync(id);
      var resource = _mapper.Map<Aircraft, GetAircraftResource>(aircraft);

      return resource;
    }

    // POST api/aircrafts
    [HttpPost]
    public async Task<IActionResult> CreateAircraftAsync([FromBody] CreateAircraftResource resource) {
        if (!ModelState.IsValid) 
        {
            return BadRequest(ModelState.GetErrorMessages());
        }

        var aircraft = _mapper.Map<CreateAircraftResource, Aircraft>(resource);
        var result = await _aircraftService.CreateAircraftAsync(aircraft);

        if (!result.Success)
        {
          return BadRequest(result.Message);
        }

        var getAircraftResource = _mapper.Map<Aircraft, GetAircraftResource>(result.Aircraft);
        return Ok(getAircraftResource);
    }

    // PUT api/aircrafts/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value) { }

    // DELETE api/aircrafts/5
    [HttpDelete("{id}")]
    public void Delete(int id) { }
  }
}