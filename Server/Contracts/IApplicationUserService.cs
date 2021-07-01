using System.Threading.Tasks;
using Entities.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace Contracts
{
    public interface IApplicationUserService
    {
        Task<ApplicationUser> GetUserAsync(string id);

        Task<ApplicationUser> GetUserByEmailAsync(string email);

        Task<Authentication> RegisterAsync(
            ApplicationUser applicationUser, string password);

        Task<Authentication> LoginAsync(string email, string password);

        Task<Authentication> RefreshTokenAsync(string token, string refreshToken);

        Task<IdentityResult> ConfirmUserEmailAsync(
            ApplicationUser user, string token);

        Task<Authentication> ResetPasswordAsync(
            ApplicationUser user, string token, string password);

        Task<IdentityResult> DeleteUserAsync(string userId);
    }
}