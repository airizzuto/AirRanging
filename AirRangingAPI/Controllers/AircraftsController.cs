using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
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

    // GET api/aircrafts
    [HttpGet]
    public async Task<IEnumerable<Aircraft>> GetAllAsync()
    {
      var aircrafts = await _aircraftService.ListAsync();
      return aircrafts;
    }

    // TODO: replace with model
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