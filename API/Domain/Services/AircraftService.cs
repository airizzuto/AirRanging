using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Repositories;
using API.Domain.Services.Communication;

namespace API.Domain.Services
{
  public class AircraftService : IAircraftService
  {
    private readonly IAircraftRepository _aircraftRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AircraftService(IAircraftRepository aircraftRepository, IUnitOfWork unitOfWork)
    {
        _aircraftRepository = aircraftRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<CreateAircraftResponse> CreateAsync(Aircraft aircraft)
    {
        // TODO: Error handling separated implementation
        try
        {
            await _aircraftRepository.CreateAsync(aircraft);
            await _unitOfWork.CompleteAsync();

            return new CreateAircraftResponse(aircraft);
        }
        catch (System.Exception ex)
        {
            return new CreateAircraftResponse(
                $"An error ocurred when saving the aircraft: {ex.Message}"
            );
        }
    }

    public async Task<Aircraft> GetByIdAsync(int id)
    {
      return await _aircraftRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Aircraft>> GetAllAsync()
    {
      return await _aircraftRepository.GetAllAsync();
    }
  }
}