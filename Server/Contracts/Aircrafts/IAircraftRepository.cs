using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Pagination;

namespace Contracts.Aircrafts
{
    public interface IAircraftRepository : IBaseRepository<Aircraft>
    {
        Task<IEnumerable<Aircraft>> GetAllAircraftsAsync();

        Task<IEnumerable<Aircraft>> GetAircraftsOwnedAsync(string userId);

        // Task<PagedList<Aircraft>> GetAircraftsSavedAsync(
        //     string userId, AircraftParameters aircraftParameters);

        Task<Aircraft> GetAircraftByIdAsync(string id);

        Task<Aircraft> CreateAircraftAsync(Aircraft aircraft, string userId);

        void UpdateAircraft(Aircraft aircraft);

        void DeleteAircraft(Aircraft aircraft);

        Aircraft CountAircraftSaved(Aircraft aircraft);
        Aircraft CountAircraftUnsaved(Aircraft aircraft);
        IEnumerable<Aircraft> FilterAircrafts(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters);
        IEnumerable<Aircraft> SortAircrafts(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters);
        PagedList<Aircraft> PaginatedAircrafts(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters);
    }
}