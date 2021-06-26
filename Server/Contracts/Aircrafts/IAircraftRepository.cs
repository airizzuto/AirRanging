using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Bookmarks;
using Entities.Models.Pagination;

namespace Contracts.Aircrafts
{
    public interface IAircraftRepository : IBaseRepository<Aircraft>
    {
        Task<PagedList<Aircraft>> GetAllAircraftsAsync(
            AircraftParameters aircraftParameters);

        Task<PagedList<Aircraft>> GetAircraftsOwnedAsync(
            string userId, AircraftParameters aircraftParameters);

        Task<PagedList<Aircraft>> GetAircraftsWithSearchAsync(
            AircraftParameters aircraftParameters);

        // Task SaveToUserAsync(string userId, Guid aircraftId);
        Task<Aircraft> GetAircraftByIdAsync(Guid id);
        Task CreateAircraftAsync(Aircraft aircraft);
        void UpdateAircraft(Aircraft aircraft);
        void DeleteAircraft(Aircraft aircraft);
        Aircraft CountAircraftSaved(Aircraft aircraft);
        Task<bool> UserOwnsAircraftAsync(Guid id, string getUserId);
    }
}