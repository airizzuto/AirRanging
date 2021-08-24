using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Bookmarks;

namespace Contracts
{
    public interface IBookmarkRepository : IBaseRepository<Bookmark>
    {
        Task SaveToBookmarkAsync(string userId, Guid aircraftId);
        Task<IEnumerable<Bookmark>> GetAllBookmarksAsync();
        Task<IEnumerable<Aircraft>> GetAircraftsBookmarkedAsync(string userId);
        Task<Bookmark> GetBookmarkedIdAsync(string userId, Guid aircraftId);
    }
}