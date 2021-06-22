using Contracts;
using Entities.Helpers;
using Entities.Models.Aircrafts;
using Microsoft.Extensions.DependencyInjection;
using Repository;

namespace App.Extensions.Configurations
{
    public static class RepositoryWrapperConfiguration
    {
        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<ISortHelper<Aircraft>, SortHelper<Aircraft>>();

            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
        }
    }
}