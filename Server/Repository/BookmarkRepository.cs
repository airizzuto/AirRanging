using System.Collections.Generic;
using System.Threading.Tasks;
using Data;
using Entities.Models.Aircrafts;
using Contracts;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Entities.Models.Bookmarks;

namespace Repository
{
    public class BookmarkRepository 
        : BaseRepository<Bookmark>, IBookmarkRepository
    {
        public BookmarkRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task SaveToBookmarkAsync(string userId, Guid aircraftId)
        {
            var bookmark = new Bookmark
            {
                AircraftId = aircraftId,
                UserId = userId
            };

            await DbContext.AddAsync(bookmark);
        }

        public async Task<IEnumerable<Aircraft>> GetAllBookmarkedAircraftsAsync()
        {
            return await FindAll()
                .OfType<Aircraft>()
                .ToListAsync();
        }

        public async Task<IEnumerable<Aircraft>> GetUserBookmarksAsync(string userId) // TODO:
        {
            return await FindByCondition(b => b.UserId == userId)
                .Select(b => b.Aircraft)
                .ToListAsync();
        }
    }
}