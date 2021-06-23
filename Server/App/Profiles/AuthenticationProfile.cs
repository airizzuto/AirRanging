using AutoMapper;
using Entities.DTOs.V1.Identity;
using Entities.Models.Identity;

namespace App.Profiles
{
    public class AuthenticationProfile : Profile
    {
        public AuthenticationProfile()
        {
            CreateMap<Authentication, AuthenticationDTO>();
            CreateMap<Authentication, AuthenticationFailedDTO>();
        }
    }
}