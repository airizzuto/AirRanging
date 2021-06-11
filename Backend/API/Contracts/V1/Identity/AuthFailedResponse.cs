using System.Collections.Generic;

namespace API.Contracts.V1.Identity
{
    public class AuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}