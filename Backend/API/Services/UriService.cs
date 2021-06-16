using System;
using API.Contracts.V1.Pagination;
using Microsoft.AspNetCore.WebUtilities;

namespace API.Services
{
    public class UriService : IUriService
    {
        private readonly string _baseUri;

        public UriService(string baseUri)
        {
            _baseUri = baseUri;
        }


        public Uri GetAllAircraftsUri(PaginationQuery pagination = null)
        {
            var uri = new Uri(_baseUri);

            if (pagination == null)
            {
                return uri;
            }

            var modifiedUri = QueryHelpers.AddQueryString(
                _baseUri, "pageNumber", pagination.PageNumber.ToString());
            modifiedUri = QueryHelpers.AddQueryString(
                modifiedUri, "pageSize", pagination.PageSize.ToString()
            );

            return new Uri(modifiedUri);
        }
    }
}