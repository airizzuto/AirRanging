using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Injectors
{
    public interface IInjector
    {
        void InjectServices(IServiceCollection services, IConfiguration configuration);
    }
}