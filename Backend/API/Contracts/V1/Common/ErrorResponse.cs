using System.Collections.Generic;

namespace API.Contracts.V1.Common
{
    public class ErrorResponse
    {
        public List<ErrorModel> Errors { get; set; } = new List<ErrorModel>();
        
        
    }
}