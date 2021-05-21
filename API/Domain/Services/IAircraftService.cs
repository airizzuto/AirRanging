using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Services.Communication;

namespace API.Domain.Services
{
    public interface IAircraftService
    {
        Task<IEnumerable<Aircraft>> GetAllAsync();
        Task<Aircraft> GetByIdAsync(int id);
        Task<CreateAircraftResponse> CreateAsync(Aircraft aircraft);
    }
}