using System.Text.Json;
using System.Text.Json.Serialization;
using API.Conventions;
using API.Extensions;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using API.Services;
using Microsoft.AspNetCore.Http;
using Logger;
using Contracts;

namespace API.Injectors
{
  public class MvcInjector : IInjector
    {
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureCors();  // TODO: SECURITY: Restrict before production

            services.ConfigureIISIntegration();

            services.ConfigureIdentity(configuration);

            services.AddSingleton<IUriService>(provider => {
                var accessor = provider.GetRequiredService<IHttpContextAccessor>();
                var request = accessor.HttpContext.Request;
                var absoluteUri = string.Concat(
                    request.Scheme, "://", request.Host.ToUriComponent(), "/");
                return new UriService(absoluteUri);
            });

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddJsonOptions(options => {
                    options.JsonSerializerOptions.Converters.Add(
                        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
                    })
                .AddNewtonsoftJson(options => {
                        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    })
                .AddFluentValidation(fv => {
                    fv.RegisterValidatorsFromAssemblyContaining<Startup>();
                    // fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                });

            services.AddSingleton<ILoggerManager, LoggerManager>();

            services.AddControllers(options => {
                options.Conventions.Add(new GroupingByNamespaceConvention());
            });

            services.ConfigureApiVersioning();

            services.ConfigureSwagger();
        }
    }
}