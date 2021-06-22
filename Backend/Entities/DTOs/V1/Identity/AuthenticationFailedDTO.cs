using System.Collections.Generic;

namespace Entities.DTOs.V1.Identity
{
    public class AuthenticationFailedDTO
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}