using System.Threading.Tasks;
using Entities.Models;
using Entities.Models.Identity;

namespace App.Services.Identity
    {
    public interface IUserService
    {
        Task<ApplicationUser> GetUserAsync(string id);
        Task<AuthenticationResult> RegisterAsync(
            string username, string email, string password
        );
        Task<AuthenticationResult> LoginAsync(string email, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);
    }
}