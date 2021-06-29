using Microsoft.Extensions.DependencyInjection;
using Logger;

namespace App.Extensions.Configurations
{
    public static class LoggerConfiguration
    {
        public static void ConfigureLogger(this IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();
        }
    }
}