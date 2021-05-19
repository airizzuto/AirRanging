using AirRangingAPI.Resources;
using API.Domain.Models;
using AutoMapper;

namespace AirRangingAPI.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Aircraft, AircraftResource>();
        }
    }
}