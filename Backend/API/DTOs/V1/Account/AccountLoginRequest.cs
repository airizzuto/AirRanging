namespace API.DTOs.V1.Account
{
    public class AccountLoginRequest
    {
        // TODO: login with username or email. Switch if @ present?
        // public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}