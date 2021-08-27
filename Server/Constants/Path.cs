namespace Constants
{
    public static class Path
    {
        public const string Base = "https://localhost";

        public static class Server
        {
            public const string Port = "5001";
            public const string Full = Base + ":" + Port;
        }

        public static class Client
        {
            public const string Port = "3000";
            public const string Full = "http://localhost" + ":" + Port;
        }
    }
}