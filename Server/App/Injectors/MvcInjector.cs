using System.Text.Json;
using System.Text.Json.Serialization;
using App.Conventions;
using App.Extensions.Configurations;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace App.Injectors
{
  public class MvcInjector : IInjector
    {
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureLogger();

            services.ConfigureCors();  // TODO: SECURITY: Restrict before production

            services.ConfigureIISIntegration();

            services.ConfigureIdentity(configuration);

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddJsonOptions(options => {
                    options.JsonSerializerOptions.Converters.Add(
                        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
                    })
                .AddNewtonsoftJson(options => {
                        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    })
                .AddFluentValidation();

            services.AddControllers(options => {
                options.Conventions.Add(new GroupingByNamespaceConvention());
            });

            services.ConfigureApiVersioning();

            services.ConfigureSwagger();
        }
    }
}