using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Contracts;
using Entities.Models;
using Entities.Models.Filters;

namespace Repositories
{
    public interface IAircraftRepository : IBaseRepository<Aircraft>
    {
        Task<IEnumerable<Aircraft>> GetAllAircraftsWithQueryAsync(
            GetAllAircraftsFilter filter = null,
            PaginationFilter paginationFilter = null);
        
        Task<IEnumerable<Aircraft>> GetAllAircraftsAsync();

        // Task<IEnumerable<Aircraft>> GetAircraftsCreated(string userId); // TODO: To aircraft DTO?

        // Task SaveToUserAsync(string userId, Guid aircraftId);
        Task<Aircraft> GetAircraftByIdAsync(Guid id);
        void CreateAircraft(Aircraft aircraft);
        void UpdateAircraft(Aircraft aircraft);
        void DeleteAircraft(Aircraft aircraft);
        Task<bool> UserOwnsAircraftAsync(Guid id, string getUserId);
    }
}