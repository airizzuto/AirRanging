using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.DependencyInjection;

namespace App.Extensions.Configurations
{
    public static class ApiVersioningConfiguration
    {
        public static void ConfigureApiVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(options =>
                {
                    options.AssumeDefaultVersionWhenUnspecified = true;
                    options.DefaultApiVersion = ApiVersion.Default;
                    options.ApiVersionReader = ApiVersionReader.Combine( 
                        new HeaderApiVersionReader("X-Version"),
                        new MediaTypeApiVersionReader("version")
                    );
                    options.ReportApiVersions = true;
                }
            );
        }
    }
}