using System.Threading.Tasks;
using Contracts;
using Contracts.Aircrafts;
using Data;
using Entities.Helpers;
using Entities.Models.Aircrafts;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly ApplicationDbContext _context;

        private IAircraftRepository _aircraft;
        private IApplicationUserRepository _applicationUser;
        private IBookmarkRepository _bookmark;
        private readonly ISortHelper<Aircraft> _aircraftsSortHelper;
        private readonly IAircraftsFilterHelper _aircraftsFilterHelper;
        private readonly IAircraftsPaginationHelper _aircraftsPaginationHelper;

        public RepositoryWrapper(
            ApplicationDbContext context,
            ISortHelper<Aircraft> aircraftsSortHelper,
            IAircraftsFilterHelper aircraftsFilterHelper,
            IAircraftsPaginationHelper aircraftsPaginationHelper
        ) {
            _context = context;
            _aircraftsSortHelper = aircraftsSortHelper;
            _aircraftsFilterHelper = aircraftsFilterHelper;
            _aircraftsPaginationHelper = aircraftsPaginationHelper;
        }

        public IAircraftRepository Aircraft {
            get
            {
                if (_aircraft == null)
                {
                    _aircraft = new AircraftRepository(
                        _context,
                        _aircraftsSortHelper,
                        _aircraftsFilterHelper,
                        _aircraftsPaginationHelper
                    );
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

        public IBookmarkRepository Bookmark {
            get
            {
                if (_bookmark == null)
                {
                    _bookmark = new BookmarkRepository(_context);
                }

                return _bookmark;
            }
        }



        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}