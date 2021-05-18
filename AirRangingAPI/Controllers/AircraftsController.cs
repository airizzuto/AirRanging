using System.Collections.Generic;
using System.Threading.Tasks;
using AirRangingAPI.Domain.Models;
using AirRangingAPI.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace AirRangingAPI.Controllers
{
  [Route("/api/[controller]")]
  [ApiController]
  public class AircraftsController : ControllerBase
  {
    private readonly IAircraftService _aircraftService;
    public AircraftsController(IAircraftService aircraftService)
    {
        _aircraftService = aircraftService;
    }
    
    // TODO: replace with model

    // GET api/aircrafts
    [HttpGet]
    public async Task<IEnumerable<Aircraft>> GetAllAsync()
    {
      var aircrafts = await _aircraftService.ListAsync();
      return aircrafts;
    }

    // GET api/aircrafts/5
    [HttpGet("{id}")]
    public ActionResult<Aircraft> Get(int id)
    {
      return "C152";
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