using System.Collections.Generic;
using System.Threading.Tasks;
using AirRangingAPI.Domain.Models;
using AirRangingAPI.Domain.Repositories;

namespace AirRangingAPI.Domain.Services
{
  public class AircraftService : IAircraftService
  {
    private readonly IAircraftRepository _aircraftRepository;
    public AircraftService(IAircraftRepository aircraftRepository)
    {
        _aircraftRepository = aircraftRepository;
    }

    public async Task<IEnumerable<Aircraft>> ListAsync()
    {
      return await _aircraftRepository.ListAsync();
    }
  }
}