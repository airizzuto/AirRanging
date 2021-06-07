using System.Collections.Generic;

namespace API.Contracts.V1.Account
{
    public class AccountAuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}