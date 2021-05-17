using System.Collections.Generic;
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
    
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
      return new string[] {"C152", "C172", "A320", "T-50"};
    }
  }
}