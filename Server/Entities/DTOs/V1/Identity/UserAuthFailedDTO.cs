using System.Collections.Generic;

namespace Entities.DTOs.V1.Identity
{
    public class UserAuthFailedDTO
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}