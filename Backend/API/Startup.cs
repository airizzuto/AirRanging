using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using API.Injectors;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Linq;
using API.Contracts.HealthChecks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using API.Extensions;
using Microsoft.AspNetCore.HttpOverrides;
using System;
using System.IO;
using NLog;
using Contracts;

namespace API
{
  public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.InjectServicesInAssembly(Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerManager logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHealthChecks("/health", new HealthCheckOptions
            {
                ResponseWriter = async (context, report) => 
                {
                    context.Response.ContentType = "application/json";

                    var response = new HealthCheckResponse
                    {
                        Status = report.Status.ToString(),
                        Checks = report.Entries.Select(x => new HealthCheck{
                            Component = x.Key,
                            Status = x.Value.Status.ToString(),
                            Description = x.Value.Description
                        }),
                        Duration = report.TotalDuration
                    };

                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
                }
            });

            app.UseSwagger();
            app.UseSwaggerUI(config => {
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "AirRangingAPI v1");
                // config.SwaggerEndpoint("/swagger/v2/swagger.json", "AirRangingAPI v2");
            });

            app.ConfigureExceptionHandler();

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
