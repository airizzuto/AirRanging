using System.Text.Json;
using System.Text.Json.Serialization;
using API.Conventions;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

namespace API.Injectors
{
    public class MvcInjector : IInjector
    {
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddJsonOptions(opts => {
                    opts.JsonSerializerOptions.Converters.Add(
                        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
                    })
                .AddNewtonsoftJson(opts => {
                        opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    })
                .AddFluentValidation(fv => { 
                    fv.RegisterValidatorsFromAssemblyContaining<Startup>();
                    fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                });

            services.AddControllers(options => {
                options.Conventions.Add(new GroupingByNamespaceConvention());
            });

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

            services.AddSwaggerGen(c =>
            {
                var titleBase = "AirRanging API";
                var description = "Web API for Aircraft Route Planning";
                var license = new OpenApiLicense() { Name = "MIT" };

                c.SwaggerDoc("v1", new OpenApiInfo 
                {
                    Version = "v1",
                    Title = titleBase + "v1",
                    Description = description,
                });
            });
        }
    }
}