using System.Collections.Generic;

namespace Entities.DTOs.V1.Errors
{
    public class ValidationErrorDTO
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}