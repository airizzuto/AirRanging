using System;
using AutoMapper;
using Moq;
using App.Mapping;
using Contracts;
using Logger;
using Entities.Models.Aircrafts;

namespace Tests.Helpers
{
    public class MockAPI : IDisposable
    {
        public Mock<IRepositoryWrapper> repo;
        public Mock<IApplicationUserService> userService;
        public Mock<ILoggerManager> logger;
        public AircraftParameters aircraftParameters;
        public AircraftsProfile aircraftProfile;
        MapperConfiguration configuration;
        public IMapper mapper;

        public MockAPI()
        {
            repo = new Mock<IRepositoryWrapper>();
            userService = new Mock<IApplicationUserService>();
            logger = new Mock<ILoggerManager>();

            aircraftParameters = new AircraftParameters();
            aircraftProfile = new AircraftsProfile();

            configuration = new MapperConfiguration(cfg => 
                cfg.AddProfile(aircraftProfile));
            mapper = new Mapper(configuration);
        }
        
        public void Dispose()
        {
            repo = null;
            userService = null;
            logger = null;
            aircraftParameters = null;
            aircraftProfile = null;
            configuration = null;
            mapper = null;
            GC.SuppressFinalize(this);
        }

    }
}