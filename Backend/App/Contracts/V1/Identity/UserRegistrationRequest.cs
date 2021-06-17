namespace App.Contracts.V1.Identity
{
    public class UserRegistrationRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}