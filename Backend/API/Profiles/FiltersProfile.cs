using API.Contracts.V1.Aircrafts;
using API.Contracts.V1.Pagination;
using Entities.Models.Filters;
using AutoMapper;

namespace API.Profiles
{
    public class PaginationProfile : Profile
    {
        public PaginationProfile()
        {
            CreateMap<PaginationQuery, PaginationFilter>();
            CreateMap<GetAllAircraftsQuery, GetAllAircraftsFilter>();
        }
    }
}