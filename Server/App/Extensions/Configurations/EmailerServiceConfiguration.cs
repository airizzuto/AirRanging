using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Emailer;

namespace App.Extensions.Configurations
{
    public static class EmailerServiceConfiguration
    {
        public static void ConfigureEmailerService(
            this IServiceCollection services, IConfiguration configuration)
        {
            var emailConfiguration = configuration
                .GetSection(nameof(EmailConfiguration))
                .Get<EmailConfiguration>();
            
            services.AddSingleton(emailConfiguration);
        }
    }
}