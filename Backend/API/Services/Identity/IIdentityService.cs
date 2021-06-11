using System.Threading.Tasks;
using API.Models.Identity;

namespace API.Services.Identity
    {
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(
            string username, string email, string password
        );

        Task<AuthenticationResult> LoginAsync(string email, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);
    }
}