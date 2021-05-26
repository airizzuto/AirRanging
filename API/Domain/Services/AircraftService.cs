using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Repositories;
using API.Domain.Services.Communication;
using Microsoft.AspNetCore.JsonPatch;

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

        public async Task<AircraftResponse> CreateAsync(Aircraft aircraft)
        {
            // TODO: Error handling separated implementation
            try
            {
                await _aircraftRepository.AddAsync(aircraft);
                await _unitOfWork.CompleteAsync();

                return new AircraftResponse(aircraft);
            }
            catch (System.Exception ex)
            {
                // logging
                return new AircraftResponse(
                    $"An error ocurred when saving the aircraft: {ex.Message}"
                );
            }
        }

        public async Task<Aircraft> FindAsync(int id)
        {
            return await _aircraftRepository.FindAsync(id);
        }

        public async Task<IEnumerable<Aircraft>> GetAllAsync()
        {
            return await _aircraftRepository.GetAllAsync();
        }

        public async Task<AircraftResponse> UpdateAsync(int id, Aircraft aircraft)
        {
            var existingAircraft = await _aircraftRepository.FindAsync(id);

            if (existingAircraft == null)
            {
                return new AircraftResponse("Aircraft not found.");
            }

            // TODO: better method for props update
            #region Entity Properties
            existingAircraft.IcaoId = aircraft.IcaoId;
            existingAircraft.Manufacturer = aircraft.Manufacturer;
            existingAircraft.Model = aircraft.Model;
            existingAircraft.Variant = aircraft.Variant;
            existingAircraft.Registration = aircraft.Registration;
            existingAircraft.AircraftType = aircraft.AircraftType;
            existingAircraft.EngineType = aircraft.EngineType;
            existingAircraft.WeightCategory = aircraft.WeightCategory;
            existingAircraft.IcaoWakeCategory = aircraft.IcaoWakeCategory;
            existingAircraft.FuelType = aircraft.FuelType;
            existingAircraft.MaxTakeoffWeight = aircraft.MaxTakeoffWeight;
            existingAircraft.CruiseSpeed = aircraft.CruiseSpeed;
            existingAircraft.FuelCapacity = aircraft.FuelCapacity;
            existingAircraft.MaxRange = aircraft.MaxRange;
            existingAircraft.ServiceCeiling = aircraft.ServiceCeiling;
            #endregion

            try
            {
                _aircraftRepository.Update(existingAircraft);
                await _unitOfWork.CompleteAsync();

                return new AircraftResponse(existingAircraft);
            }
            catch (System.Exception ex)
            {
                return new AircraftResponse(
                    $"Error ocurred when updating the aircraft: {ex.Message}"
                );
            }
        }

        public async Task<AircraftResponse> PartialUpdateAsync(Aircraft aircraft)
        {
            try
            {
                _aircraftRepository.Update(aircraft);
                await _unitOfWork.CompleteAsync();

                return new AircraftResponse(aircraft);
            }
            catch (System.Exception ex)
            {
                return new AircraftResponse(
                    $"Error ocurred updating aircraft property: {ex.Message}"
                );
            }
        }

        public async Task<AircraftResponse> DeleteAsync(int id)
        {
            var existingAircraft = await _aircraftRepository.FindAsync(id);

            if (existingAircraft == null)
            {
                return new AircraftResponse("Aircraft not found");
            }

            try
            {
                _aircraftRepository.Remove(existingAircraft);
                await _unitOfWork.CompleteAsync();

                return new AircraftResponse(existingAircraft);
            }
            catch (System.Exception ex)
            {
                return new AircraftResponse($"An error ocurred when deleting the aircraft: {ex.Message}");
            }
        }
    }
}