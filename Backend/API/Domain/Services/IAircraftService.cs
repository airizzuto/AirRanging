using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Services.Communication;

namespace API.Domain.Services
{
    public interface IAircraftService
    {
        Task<IEnumerable<Aircraft>> GetAllAsync();
        Task<Aircraft> FindAsync(int id);
        Task<AircraftResponse> CreateAsync(Aircraft aircraft);
        Task<AircraftResponse> UpdateAsync(int id, Aircraft aircraft);
        Task<AircraftResponse> PartialUpdateAsync(Aircraft aircraft);
        Task<AircraftResponse> DeleteAsync(int id);
    }
}