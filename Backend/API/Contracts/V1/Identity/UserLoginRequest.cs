namespace API.Contracts.V1.Identity
{
    public class UserLoginRequest
    {
        // TODO: login with username or email. Switch if @ present?
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}