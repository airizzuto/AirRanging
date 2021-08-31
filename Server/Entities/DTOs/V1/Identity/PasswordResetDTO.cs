namespace Entities.DTOs.V1.Identity
{
    public class PasswordResetDTO
    {
        public string Password { get; set; }

        public string Email { get; set; }
        public string Token { get; set; }
    }
}