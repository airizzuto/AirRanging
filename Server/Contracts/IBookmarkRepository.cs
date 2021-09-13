using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Bookmarks;

namespace Contracts
{
    public interface IBookmarkRepository : IBaseRepository<Bookmark>
    {
        Task<Bookmark> CreateBookmarkAsync(string userId, string aircraftId);
        Task<Bookmark> CreateBookmarkAsync(string userId, Guid aircraftId);

        void RemoveBookmarkAsync(string userId, string aircraftId);

        Task<IEnumerable<Bookmark>> GetAllBookmarksAsync();
        Task<IEnumerable<Aircraft>> GetAircraftsBookmarkedAsync(string userId);
        Task<Bookmark> GetBookmarkIdAsync(string userId, string aircraftId);
    }
}