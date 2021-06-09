using API.Contracts.V1.Pagination;
using API.Models.Pagination;
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