using System.Threading.Tasks;
using API.Models;

namespace API.Services.Identity
    {
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string password);
        Task<AuthenticationResult> LoginAsync(string email, string password);
    }
}