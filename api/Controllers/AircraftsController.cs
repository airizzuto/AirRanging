using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AircraftsController : ControllerBase
  {
    // TODO:
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
      return new string[] {"C152", "C172", "A320", "T-50"};
    }
  }
}