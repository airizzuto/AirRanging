namespace API.DTOs.V1.Account
{
    public class AccountRegistrationRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}