using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models;

namespace Contracts
{
    public interface IApplicationUserRepository
    {
        Task<IEnumerable<Aircraft>> GetAllOwnedAircraftsAsync();
        Task<IEnumerable<Aircraft>> GetAllBookmarkedAircraftsAsync();
    }
}