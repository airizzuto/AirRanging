using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
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