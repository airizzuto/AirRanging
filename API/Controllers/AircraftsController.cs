using System.Collections.Generic;
using System.Threading.Tasks;
using API.Resources;
using API.Domain.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IEnumerable<AircraftResource>> GetAllAsync()
    {
        var aircrafts = await _aircraftService.GetAllAircraftsAsync();
        var resources = _mapper.Map<IEnumerable<Aircraft>, IEnumerable<AircraftResource>>(aircrafts);

        return resources;
    }

    // GET api/aircrafts/5
    [HttpGet("{id}")]
    public async Task<AircraftResource> GetIdAsync(int id)
    {
      var aircraft = await _aircraftService.GetAircraftByIdAsync(id);
      var resource = _mapper.Map<Aircraft, AircraftResource>(aircraft);

      return resource;
    }

    // POST api/aircrafts
    [HttpPost]
    public void Post([FromBody] string value) { }

    // PUT api/aircrafts/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value) { }

    // DELETE api/aircrafts/5
    [HttpDelete("{id}")]
    public void Delete(int id) { }
  }
}