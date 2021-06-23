using System;
using API.Data.Repositories;
using API.Mapping;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Moq;

namespace API.Tests.Helpers
{
    public class MockAPI : IDisposable
    {
        public Mock<IAircraftRepository> repo;
        public AircraftsProfile profile;
        MapperConfiguration configuration;
        public IMapper mapper;
        public ILogger logger;

        public MockAPI()
        {
            repo = new Mock<IAircraftRepository>();
            profile = new AircraftsProfile();
            configuration = new MapperConfiguration(cfg => 
                cfg.AddProfile(profile));
            mapper = new Mapper(configuration);
        }
        
        public void Dispose()
        {
            repo = null;
            mapper = null;
            configuration = null;
            profile = null;
            GC.SuppressFinalize(this);
        }

    }
}