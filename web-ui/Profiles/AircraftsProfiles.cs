using AutoMapper;

namespace AirRangingAPI.Profiles
{
  public class AircraftsProfiles : Profile
  {
    public AircraftsProfiles()
    {
      CreateMap<Aircraft, AircraftReadDto>();
    }
  }
}