using System.Collections.Generic;
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
    public ActionResult<IEnumerable<string>> Get()
    {
      return new string[] {"C152", "C172", "A320", "T-50"};
    }

    // GET api/aircrafts/5
    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
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