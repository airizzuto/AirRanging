using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Models.Filters;

namespace API.Data.Repositories
{
    public interface IAircraftRepository
    {
        Task SaveChangesAsync();
        Task<IEnumerable<Aircraft>> GetAllAircraftsAsync(
            GetAllAircraftsFilter filter = null,
            PaginationFilter paginationFilter = null);

        Task<Aircraft> GetAircraftByIdAsync(Guid id);
        Task CreateAircraftAsync(Aircraft aircraft);
        void UpdateAircraft(Aircraft aircraft);
        void DeleteAircraft(Aircraft aircraft);
        Task<bool> UserOwnsAircraftAsync(Guid id, string getUserId);
    }
}