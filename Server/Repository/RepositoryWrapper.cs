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
        private readonly ISortHelper<Aircraft> _aircraftSortHelper;

        private IBookmarkRepository _bookmark;

        // TODO: resolve coupling of identity
        // // private IApplicationUserService _applicationUser;
        // private readonly UserManager<ApplicationUser> _userManager;
        // private readonly RoleManager<IdentityRole> _roleManager;

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

        // public IApplicationUserService ApplicationUser {
        //     get
        //     {
        //         if (_applicationUser == null)
        //         {
        //             _applicationUser = new ApplicationUserService(
        //                 _userManager,
        //                 _roleManager,
        //                 _context
        //             );
        //         }

        //         return _applicationUser;
        //     }
        // }

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

        public RepositoryWrapper(
            ApplicationDbContext context,
            ISortHelper<Aircraft> aircraftSortHelper
            // UserManager<ApplicationUser> userManager,
            // RoleManager<IdentityRole> roleManager
            )
        {
            _context = context;
            _aircraftSortHelper = aircraftSortHelper;
            // _userManager = userManager;
            // _roleManager = roleManager;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}