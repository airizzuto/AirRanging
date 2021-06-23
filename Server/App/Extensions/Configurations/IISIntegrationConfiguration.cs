using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace App.Extensions.Configurations
{
    public static class IISIntegrationConfiguration
    {
        public static void ConfigureIISIntegration(
            this IServiceCollection services)
        {
            services.Configure<IISOptions>(options => 
            {

            });
        }
    }
}