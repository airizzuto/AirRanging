using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data.Repositories
{
    public interface IAircraftRepository
    {
        Task SaveChangesAsync();
        Task<IEnumerable<Aircraft>> GetAllAircraftsAsync();
        Task<Aircraft> GetAircraftByIdAsync(int id);
        Task CreateAircraftAsync(Aircraft aircraft);
        void UpdateAircraft(Aircraft aircraft);
        void DeleteAircraft(Aircraft aircraft);
    }
}