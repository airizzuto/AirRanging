using API.Domain.Models;
using API.DTOs.Aircraft;
using AutoMapper;

namespace API.Mapping
{
    public class AircraftsProfile : Profile
    {
        public AircraftsProfile()
        {
            CreateMap<Aircraft, AircraftCreateDTO>();
            CreateMap<AircraftCreateDTO, Aircraft>();
            CreateMap<AircraftUpdateDTO, Aircraft>();
            CreateMap<Aircraft, AircraftUpdateDTO>();
        }
    }
}