using System.Threading.Tasks;
using Contracts;
using Entities.Data;

namespace Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly RepositoryContext _context;
        private IAircraftRepository _aircraft;
        private IApplicationUserRepository _applicationUser;

        public IAircraftRepository Aircraft {
            get {
                if (_aircraft == null)
                {
                    _aircraft = new AircraftRepository(_context);
                }

                return _aircraft;
            }
        }

        public IApplicationUserRepository ApplicationUser {
            get {
                if (_applicationUser == null)
                {
                    _applicationUser = new ApplicationUserRepository(_context);
                }

                return _applicationUser;
            }
        }

        public UnitOfWork(RepositoryContext context)
        {
            _context = context;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}