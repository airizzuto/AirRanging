namespace API.DTOs.V1.Account
{
    public class AccountAuthSuccessResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}