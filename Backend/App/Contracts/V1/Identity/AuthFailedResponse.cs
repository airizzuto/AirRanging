using System.Collections.Generic;

namespace App.Contracts.V1.Identity
{
    public class AuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}