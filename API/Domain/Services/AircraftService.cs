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

    public async Task<SaveAircraftResponse> CreateAsync(Aircraft aircraft)
    {
        // TODO: Error handling separated implementation
        try
        {
            await _aircraftRepository.AddAsync(aircraft);
            await _unitOfWork.CompleteAsync();

            return new SaveAircraftResponse(aircraft);
        }
        catch (System.Exception ex)
        {
            // logging
            return new SaveAircraftResponse(
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

    public async Task<SaveAircraftResponse> UpdateAsync(int id, Aircraft aircraft)
    {
        var existingAircraft = await _aircraftRepository.GetByIdAsync(id);

        if (existingAircraft == null)
        {
            return new SaveAircraftResponse("Aircraft not found.");
        }

        // entity properties rewrite

        try
        {
            _aircraftRepository.Update(existingAircraft);
            await _unitOfWork.CompleteAsync();

            return new SaveAircraftResponse(existingAircraft);
        }
        catch (System.Exception ex)
        {
            // logging
            return new SaveAircraftResponse(
                $"Error ocurred when updating the aircraft: {ex.Message}"
            );
        }
    }
  }
}