using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Pagination;

namespace Contracts.Aircrafts
{
    public interface IAircraftRepository : IBaseRepository<Aircraft>
    {
        Task<PagedList<Aircraft>> GetAircraftsAsync(
            AircraftParameters aircraftParameters);

        Task<PagedList<Aircraft>> GetAircraftsOwned(
            string userId, AircraftParameters aircraftParameters);

        // Task<PagedList<Aircraft>> GetAircraftsBookmarked(
        //     Guid userId, AircraftParameters aircraftParameters);

        // Task SaveToUserAsync(string userId, Guid aircraftId);
        Task<Aircraft> GetAircraftByIdAsync(Guid id);
        void CreateAircraft(Aircraft aircraft);
        void UpdateAircraft(Aircraft aircraft);
        void DeleteAircraft(Aircraft aircraft);
        Task<bool> UserOwnsAircraftAsync(Guid id, string getUserId);
    }
}