using System.Collections.Generic;

namespace API.DTOs.V1.Account
{
    public class AccountAuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}