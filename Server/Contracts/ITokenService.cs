using System.Threading.Tasks;
using Entities.Models.Identity;

namespace Contracts
{
    public interface ITokenService
    {
        Task<Authentication> RefreshTokenAsync(string token, string refreshToken);

        Task<Authentication> GenerateAuthenticationResultForUserAsync(ApplicationUser user);

    }
}