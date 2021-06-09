using System;
using API.Contracts.V1.Pagination;

namespace API.Services
{
    public interface IUriService
    {
        Uri GetAllAircraftsUri(PaginationQuery pagination = null);
    }
}