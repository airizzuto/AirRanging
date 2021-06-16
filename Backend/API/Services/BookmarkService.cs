using System;
using System.Threading.Tasks;
using API.Data;
using API.Models;

namespace API.Services
{
    public class BookmarkService : IBookmarkService
    {
        RepositoryContext _context;
        public BookmarkService(RepositoryContext context)
        {
            _context = context;
        }

        public async Task SaveAsync(string userId, Guid aircraftId)
        {
            var bookmark = new Bookmark { UserId = userId, AircraftId = aircraftId };
            await _context.Bookmarks.AddAsync(bookmark);
        }
    }
}