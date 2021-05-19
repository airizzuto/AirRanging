using API.Resources;
using API.Domain.Models;
using AutoMapper;

namespace API.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Aircraft, AircraftResource>();
        }
    }
}