using System;
using API.Contracts.V1.Common;

namespace API.Services
{
    public interface IUriService
    {
        Uri GetAllAircraftsUri(PaginationQuery pagination = null);
    }
}