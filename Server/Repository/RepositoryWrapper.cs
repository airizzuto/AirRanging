using System.Threading.Tasks;
using Contracts;
using Contracts.Aircrafts;
using Contracts.Landmarks;
using Data;
using Entities.Helpers;
using Entities.Helpers.Aircrafts;
using Entities.Helpers.Landmarks;
using Entities.Models.Aircrafts;
using Entities.Models.Landmarks;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly ApplicationDbContext _context;

        private IAircraftRepository _aircraft;
        private readonly ISortHelper<Aircraft> _aircraftsSortHelper;
        private readonly IAircraftsFilterHelper _aircraftsFilterHelper;
        private readonly IAircraftsPaginationHelper _aircraftsPaginationHelper;
        private ILandmarkRepository _landmark;
        private readonly ISortHelper<Landmark> _landmarksSortHelper;
        private readonly ILandmarksFilterHelper _landmarksFilterHelper;
        private readonly ILandmarksPaginationHelper _landmarksPaginationHelper;
        private IApplicationUserRepository _applicationUser;
        private IBookmarkRepository _bookmark;

        public RepositoryWrapper(
            ApplicationDbContext context,
            ISortHelper<Aircraft> aircraftsSortHelper,
            IAircraftsFilterHelper aircraftsFilterHelper,
            IAircraftsPaginationHelper aircraftsPaginationHelper,
            ISortHelper<Landmark> landmarksSortHelper,
            ILandmarksFilterHelper landmarksFilterHelper,
            ILandmarksPaginationHelper landmarksPaginationHelper
        ) {
            _context = context;
            _aircraftsSortHelper = aircraftsSortHelper;
            _aircraftsFilterHelper = aircraftsFilterHelper;
            _aircraftsPaginationHelper = aircraftsPaginationHelper;
            _landmarksSortHelper = landmarksSortHelper;
            _landmarksFilterHelper = landmarksFilterHelper;
            _landmarksPaginationHelper = landmarksPaginationHelper;
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

        public ILandmarkRepository Landmark { 
            get
            {
                if (_landmark == null)
                {
                    _landmark = new LandmarkRepository(
                        _context,
                        _landmarksSortHelper,
                        _landmarksFilterHelper,
                        _landmarksPaginationHelper
                    );
                }

                return _landmark;
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