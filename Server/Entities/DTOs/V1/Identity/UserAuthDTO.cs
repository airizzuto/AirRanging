namespace Entities.DTOs.V1.Identity
{
    public class UserAuthDTO
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}