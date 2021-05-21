using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Repositories;

namespace API.Domain.Services
{
  public class AircraftService : IAircraftService
  {
    private readonly IAircraftRepository _aircraftRepository;
    public AircraftService(IAircraftRepository aircraftRepository)
    {
        _aircraftRepository = aircraftRepository;
    }

    public async Task<Aircraft> GetAircraftByIdAsync(int id)
    {
      return await _aircraftRepository.GetAircraftByIdAsync(id);
    }

    public async Task<IEnumerable<Aircraft>> GetAllAircraftsAsync()
    {
      return await _aircraftRepository.GetAllAircraftsAsync();
    }
  }
}