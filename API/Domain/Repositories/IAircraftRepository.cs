using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;

namespace API.Domain.Repositories
{
    public interface IAircraftRepository
    {
        Task<IEnumerable<Aircraft>> GetAllAsync();
        Task<Aircraft> FindAsync(int id);
        Task AddAsync(Aircraft aircraft);
        void Update(Aircraft aircraft);
    }
}