using API.Contracts.V1.Common;
using API.Models.Common;
using AutoMapper;

namespace API.Profiles
{
    public class PaginationProfile : Profile
    {
        public PaginationProfile()
        {
            CreateMap<PaginationQuery, PaginationFilter>();
        }
    }
}