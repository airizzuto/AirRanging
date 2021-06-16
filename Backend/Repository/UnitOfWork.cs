using System.Threading.Tasks;
using Entities.Data;

namespace Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private RepositoryContext _context;
        private IAircraftRepository _aircraft;

        public IAircraftRepository Aircraft {
            get {
                if (_aircraft == null)
                {
                    _aircraft = new AircraftRepository(_context);
                }

                return _aircraft;
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