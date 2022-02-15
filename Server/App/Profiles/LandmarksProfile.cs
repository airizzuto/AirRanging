using AutoMapper;
using Entities.Models.Landmarks;
using Entities.DTOs.V1.Landmarks;

namespace App.Profiles
{
    public class LandmarksProfile : Profile
    {
        public LandmarksProfile()
        {
            CreateMap<Landmark, LandmarkReadDTO>();
            CreateMap<LandmarkCreateDTO, Landmark>();
            CreateMap<LandmarkUpdateDTO, Landmark>();
            CreateMap<Landmark, LandmarkUpdateDTO>();
        }
    }
}