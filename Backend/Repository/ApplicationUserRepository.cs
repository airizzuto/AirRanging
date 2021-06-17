using System.Collections.Generic;
using System.Threading.Tasks;
using Contracts;
using Entities.Data;
using Entities.Models.Aircrafts;

namespace Repository
{
    public class ApplicationUserRepository : IApplicationUserRepository
    {
        // TODO:
        RepositoryContext _context;
        public ApplicationUserRepository(RepositoryContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Aircraft>> GetAllBookmarkedAircraftsAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Aircraft>> GetAllOwnedAircraftsAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}