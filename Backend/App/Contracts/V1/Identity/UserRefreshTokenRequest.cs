namespace App.Contracts.V1.Identity
{
    public class UserRefreshTokenRequest
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}