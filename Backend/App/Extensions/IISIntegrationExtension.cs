using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace App.Extensions
{
    public static class IISIntegrationExtension
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