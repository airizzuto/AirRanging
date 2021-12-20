using Microsoft.Extensions.DependencyInjection;

namespace App.Extensions.Configurations
{
    public static class CorsConfiguration
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            // TODO: check if needed to restrict
            services.AddCors(options => 
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithExposedHeaders("X-Pagination"));
            });
        }
    }
}