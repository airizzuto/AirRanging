using AutoMapper;
using Entities.DTOs.V1.Identity;
using Entities.Models.Identity;

namespace App.Profiles
{
    public class ApplicationUserProfiles : Profile
    {
        public ApplicationUserProfiles()
        {
            CreateMap<UserRegistrationDTO, ApplicationUser>();
            CreateMap<UserLoginDTO, ApplicationUser>();
            CreateMap<ApplicationUser, UserLoginDTO>();
            CreateMap<ApplicationUser, UserAuthDTO>();
        }
    }
}