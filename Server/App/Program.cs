using System;
using System.Threading.Tasks;
using Constants;
using Data;
using Entities.Models.Identity;
using Logger;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace App
{
  public class Program
    {
        public async static Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var loggerManager = services.GetRequiredService<ILoggerManager>();

                try
                {
                    var dbContext = services.GetRequiredService<ApplicationDbContext>();
                    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
                    await DataSeeding.SeedDefaultUser(dbContext, userManager);
                    // await DataSeeding.SeedMockUsers(dbContext, userManager);
                    await DataSeeding.SeedAircraftExamples(dbContext, userManager);
                    await DataSeeding.SeedLandmarkExamples(dbContext, userManager);
                }
                catch (Exception ex)
                {
                    var logger = new LoggerManager();
                    logger.LogError($"An error ocurred seeding the DB: {ex.Message}");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                        .UseUrls(Path.Server.Full);
                });
    }
}
