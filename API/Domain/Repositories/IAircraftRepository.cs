using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;

namespace API.Domain.Repositories
{
    public interface IAircraftRepository
    {
        Task<IEnumerable<Aircraft>> GetAllAircraftsAsync();
        Task<Aircraft> FindAircraftByIdAsync(int id);
        Task AddAircraftAsync(Aircraft aircraft);
        void UpdateAircraft(Aircraft aircraft);
        void RemoveAircraft(Aircraft aircraft);
    }
}