using System.Threading.Tasks;
using Entities.Models.Identity;

namespace Contracts
{
    public interface IApplicationUserService
    {
        Task<ApplicationUser> GetUserAsync(string id);
        Task<Authentication> RegisterAsync(ApplicationUser applicationUser, string password);
        Task<Authentication> LoginAsync(string email, string password);
        Task<Authentication> RefreshTokenAsync(string token, string refreshToken);
    }
}