using System.Threading.Tasks;
using Contracts;
using Contracts.Aircrafts;
using Entities.Data;
using Entities.Helpers;
using Entities.Models.Aircrafts;
using Entities.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Repository.Settings;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _context;

        private IAircraftRepository _aircraft;
        private readonly ISortHelper<Aircraft> _aircraftSortHelper;

        private IBookmarkRepository _bookmark;

        // TODO: resolve coupling of identity
        private IApplicationUserRepository _applicationUser;
        private readonly JwtSettings _jwtSettings;
        private readonly TokenValidationParameters _tokenValidationParameters;
        private UserManager<ApplicationUser> _userManager;

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
                    _applicationUser = new ApplicationUserRepository(
                        _userManager,
                        _jwtSettings,
                        _tokenValidationParameters,
                        _context
                    );
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

        public RepositoryWrapper(
            RepositoryContext context,
            ISortHelper<Aircraft> aircraftSortHelper,
            JwtSettings jwtSettings,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _aircraftSortHelper = aircraftSortHelper;
            _jwtSettings = jwtSettings;
            _userManager = userManager;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}