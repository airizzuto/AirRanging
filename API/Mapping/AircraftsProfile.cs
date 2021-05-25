using API.Domain.Models;
using API.Resources;
using AutoMapper;

namespace API.Mapping
{
    public class AircraftsProfile : Profile
    {
        public AircraftsProfile()
        {
            CreateMap<Aircraft, AircraftCreateResource>();
            CreateMap<AircraftCreateResource, Aircraft>();
            CreateMap<AircraftUpdateResource, Aircraft>();
            CreateMap<Aircraft, AircraftUpdateResource>();
        }
    }
}