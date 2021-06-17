using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace App.Injectors
{
    public interface IInjector
    {
        void InjectServices(IServiceCollection services, IConfiguration configuration);
    }
}