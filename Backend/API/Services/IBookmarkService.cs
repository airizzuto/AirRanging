using System;
using System.Threading.Tasks;
using Entities.Models;

namespace API.Services
{
    public interface IBookmarkService
    {
        Task SaveAsync(string userId, Guid aircraftId);

        // TODO: Remove?
    }
}