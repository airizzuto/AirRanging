using System.Threading.Tasks;
using API.Models;

namespace API.Data.Repositories
    {
    public interface IIdentityRepository
    {
        Task<AuthenticationResult> RegisterAsync(string email, string password);
        Task<AuthenticationResult> LoginAsync(string email, string password);
    }
}