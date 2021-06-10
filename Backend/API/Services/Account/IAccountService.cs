using System.Threading.Tasks;
using API.Models.Account;

namespace API.Services.Account
    {
    public interface IAccountService
    {
        Task<AccountAuthResult> RegisterAsync(
            string username, string email, string password
        );

        Task<AccountAuthResult> LoginAsync(string email, string password);
        Task<AccountAuthResult> RefreshTokenAsync(string token, string refreshToken);
    }
}