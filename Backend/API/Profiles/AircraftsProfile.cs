using Entities.Models;
using Entities.DTOs.V1.Aircraft;
using AutoMapper;

namespace API.Mapping
{
    public class AircraftsProfile : Profile
    {
        public AircraftsProfile()
        {
            CreateMap<Aircraft, AircraftReadDTO>();
            CreateMap<AircraftCreateDTO, Aircraft>();
            CreateMap<AircraftUpdateDTO, Aircraft>();
            CreateMap<Aircraft, AircraftUpdateDTO>();
        }
    }
}