using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace App.Injectors
{
    public static class InjectorExtensions
    {
        public static void InjectServicesInAssembly(this IServiceCollection services, IConfiguration configuration)
        {
            var injectors = typeof(Startup).Assembly.ExportedTypes
                .Where(x => typeof(IInjector).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                .Select(Activator.CreateInstance)
                .Cast<IInjector>()
                .ToList();

            injectors.ForEach(injector => injector.InjectServices(services, configuration));
        }
    }
}