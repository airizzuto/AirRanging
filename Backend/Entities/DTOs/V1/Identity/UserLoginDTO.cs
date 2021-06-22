namespace Entities.DTOs.V1.Identity
{
    public class UserLoginDTO
    {
        // TODO: login with username or email. Switch if @ present?
        // public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}