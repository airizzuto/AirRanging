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
        { }

        /// <summary>
        /// Creates a new <typeparamref name="Bookmark">Bookmark</typeparamref> used to save Aircraft reference to ApplicationUser.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="aircraftId"></param>
        public async Task SaveToBookmarkAsync(string userId, Guid aircraftId)
        {
            var bookmark = new Bookmark
            {
                AircraftId = aircraftId,
                UserId = userId
            };

            await DbContext.AddAsync(bookmark);
        }

        /// <summary>
        /// Removes Bookmark used to save Aircraft to User.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="aircraftId"></param>
        public void RemoveBookmarkAsync(string userId, Guid aircraftId)
        {
            var bookmark = FindByCondition(bookmark => 
                (bookmark.UserId == userId) && (bookmark.AircraftId == aircraftId));

            DbContext.Remove(bookmark);
        }

        /// <summary>
        /// Retrieves all Bookmarks in repository.
        /// </summary>
        /// <returns>Bookmarks</returns>
        public async Task<IEnumerable<Bookmark>> GetAllBookmarksAsync()
        {
            return await FindAll().ToListAsync();
        }

        /// <summary>
        /// Retrieves all aircrafts bookmarked by user.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Aircrafts</returns>
        public async Task<IEnumerable<Aircraft>> GetAircraftsBookmarkedAsync(string userId)
        {
            return await FindByCondition(b => b.UserId == userId)
                .Select(b => b.Aircraft)
                .ToListAsync();
        }

        // TODO: retrieve aircraft?
        /// <summary>
        /// Retrieves bookmark referencing User and Aircraft.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="aircraftId"></param>
        /// <returns>Bookmark</returns>
        public async Task<Bookmark> GetBookmarkedIdAsync(string userId, Guid aircraftId)
        {
            return await FindByCondition(b =>
                b.UserId == userId && b.AircraftId == aircraftId
            ).FirstAsync();
        }
    }
}