namespace API.Contracts.V1.Account
{
    public class AccountAuthSuccessResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}