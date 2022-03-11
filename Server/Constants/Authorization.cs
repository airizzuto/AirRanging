
namespace Constants
{
    public class Authorization
    {
        public enum Roles
        {
            Administrator,
            User,
            Guest
        }

        public const string default_username = "user";
        public const string default_email = "user@airrangingapp.com";
        public const string default_password = "Passw0rd";
        public const Roles default_role = Roles.User;

    }
}
