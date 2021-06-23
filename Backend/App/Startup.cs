using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using App.Injectors;
using App.HealthChecks;
using Newtonsoft.Json;
using NLog;
using App.Extensions.Configurations;

namespace App
{
  public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.InjectServicesInAssembly(Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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

                    var response = new HealthChecksListed
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
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "AirRangingApp v1");
                // config.SwaggerEndpoint("/swagger/v2/swagger.json", "AirRangingApp v2");
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
