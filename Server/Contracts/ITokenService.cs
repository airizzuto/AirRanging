using System.Collections.Generic;
using System.Security.Claims;

namespace Contracts
{
    public interface ITokenService
    {
        string GenerateRefreshToken();
        string GenerateAccessToken(IEnumerable<Claim> claims);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}