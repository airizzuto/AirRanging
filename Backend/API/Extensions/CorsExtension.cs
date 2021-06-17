using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class CorsExtension
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options => 
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }
    }
}