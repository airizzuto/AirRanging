using Contracts;
using Logger;
using Microsoft.Extensions.DependencyInjection;

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