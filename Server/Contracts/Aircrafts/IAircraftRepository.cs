using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Bookmarks;
using Entities.Models.Pagination;

namespace Contracts.Aircrafts
{
    public interface IAircraftRepository : IBaseRepository<Aircraft>
    {
        IQueryable<Aircraft> GetAllAircrafts(
            AircraftParameters aircraftParameters);

        Task<PagedList<Aircraft>> GetAllAircraftsPaginatedAsync(
            AircraftParameters aircraftParameters);

        Task<PagedList<Aircraft>> GetAircraftsOwnedAsync(
            string userId, AircraftParameters aircraftParameters);

        Task<PagedList<Aircraft>> GetAircraftsSavedAsync(
            string userId, AircraftParameters aircraftParameters);

        Task<PagedList<Aircraft>> GetAircraftsWithSearchAsync(
            AircraftParameters aircraftParameters);

        Task<Aircraft> GetAircraftByIdAsync(Guid id);
        Task<Aircraft> CreateAircraftAsync(Aircraft aircraft, string userId);
        void UpdateAircraft(Aircraft aircraft);
        void DeleteAircraft(Aircraft aircraft);
        Aircraft CountAircraftSaved(Aircraft aircraft);
        Aircraft CountAircraftUnsaved(Aircraft aircraft);
    }
}