using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;

namespace API.Domain.Interfaces
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