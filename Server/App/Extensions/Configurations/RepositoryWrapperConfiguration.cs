using Contracts;
using Entities.Helpers;
using Entities.Helpers.Aircrafts;
using Entities.Helpers.Landmarks;
using Entities.Models.Aircrafts;
using Entities.Models.Landmarks;
using Microsoft.Extensions.DependencyInjection;
using Repository;

namespace App.Extensions.Configurations
{
    public static class RepositoryWrapperConfiguration
    {
        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<ISortHelper<Aircraft>, SortHelper<Aircraft>>();
            services.AddScoped<IAircraftsFilterHelper, AircraftsFilterHelper>();
            services.AddScoped<IAircraftsPaginationHelper, AircraftsPaginationHelper>();
            services.AddScoped<ISortHelper<Landmark>, SortHelper<Landmark>>();
            services.AddScoped<ILandmarksFilterHelper, LandmarksFilterHelper>();
            services.AddScoped<ILandmarksPaginationHelper, LandmarksPaginationHelper>();

            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
        }
    }
}