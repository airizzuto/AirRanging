using System;
using API.Domain.Repositories;
using API.Domain.Services;
using API.Mapping;
using AutoMapper;
using Moq;

namespace API.Tests.Helpers
{
    public class MockAPI : IDisposable
    {
        public Mock<IAircraftRepository> repo;
        public Mock<IAircraftService> service;
        public AircraftsProfile profile;
        MapperConfiguration configuration;
        public IMapper mapper;
        
        public MockAPI()
        {
            repo = new Mock<IAircraftRepository>();
            service = new Mock<IAircraftService>();
            profile = new AircraftsProfile();
            configuration = new MapperConfiguration(cfg => 
                cfg.AddProfile(profile));
            mapper = new Mapper(configuration);
        }
        
        public void Dispose()
        {
            repo = null;
            service = null;
            mapper = null;
            configuration = null;
            profile = null;
            GC.SuppressFinalize(this);
        }

    }
}