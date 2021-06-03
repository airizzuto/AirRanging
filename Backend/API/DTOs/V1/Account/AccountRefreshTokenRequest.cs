namespace API.DTOs.V1.Account
{
    public class AccountRefreshTokenRequest
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}