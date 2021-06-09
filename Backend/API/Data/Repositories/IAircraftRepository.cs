using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Models.Pagination;

namespace API.Data.Repositories
{
    public interface IAircraftRepository
    {
        Task SaveChangesAsync();
        Task<IEnumerable<Aircraft>> GetAllAircraftsAsync(PaginationFilter paginationFilter = null);
        Task<Aircraft> GetAircraftByIdAsync(Guid id);
        Task CreateAircraftAsync(Aircraft aircraft);
        void UpdateAircraft(Aircraft aircraft);
        void DeleteAircraft(Aircraft aircraft);
        Task<bool> UserOwnsAircraftAsync(Guid id, string getUserId);
    }
}