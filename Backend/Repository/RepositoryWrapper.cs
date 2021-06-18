using System.Threading.Tasks;
using Contracts;
using Contracts.Aircrafts;
using Entities.Data;
using Entities.Helpers;
using Entities.Models.Aircrafts;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _context;
        private IAircraftRepository _aircraft;
        private IApplicationUserRepository _applicationUser;

        private readonly ISortHelper<Aircraft> _aircraftSortHelper;

        public IAircraftRepository Aircraft {
            get
            {
                if (_aircraft == null)
                {
                    _aircraft = new AircraftRepository(_context, _aircraftSortHelper);
                }

                return _aircraft;
            }
        }

        public IApplicationUserRepository ApplicationUser {
            get
            {
                if (_applicationUser == null)
                {
                    _applicationUser = new ApplicationUserRepository(_context);
                }

                return _applicationUser;
            }
        }

        public RepositoryWrapper(
            RepositoryContext context,
            ISortHelper<Aircraft> aircraftSortHelper)
        {
            _context = context;
            _aircraftSortHelper = aircraftSortHelper;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}