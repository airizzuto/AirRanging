using System.Collections.Generic;

namespace Entities.DTOs.V1.Identity
{
    public class AuthenticationFailedDTO
    {
        public IEnumerable<string> Errors { get; set; }
    }
}