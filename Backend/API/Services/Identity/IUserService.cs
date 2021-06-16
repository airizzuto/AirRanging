using System.Threading.Tasks;
using API.Models;
using API.Models.Identity;

namespace API.Services.Identity
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