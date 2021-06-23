namespace Entities.DTOs.V1.Identity
{
    public class AuthenticationDTO
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}