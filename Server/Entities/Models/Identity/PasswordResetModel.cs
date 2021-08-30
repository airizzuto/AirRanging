namespace Entities.Models.Identity
{
    public class PasswordResetModel
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Email { get; set; }
        public string ResetToken { get; set; }
    }
}