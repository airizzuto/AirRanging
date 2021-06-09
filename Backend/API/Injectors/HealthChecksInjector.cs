using API.Data.Contexts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Injectors
{
  public class HealthChecksInjector : IInjector
  {
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddHealthChecks()
                .AddDbContextCheck<ApplicationDbContext>();
        }
    }
}