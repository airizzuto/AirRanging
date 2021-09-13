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
        public async Task<Bookmark> CreateBookmarkAsync(string userId, string aircraftId)
        {
            var bookmark = new Bookmark
            {
                AircraftId = Guid.Parse(aircraftId),
                UserId = userId
            };

            await DbContext.AddAsync(bookmark);

            return bookmark;
        }

        /// <summary>
        /// Creates a new <typeparamref name="Bookmark">Bookmark</typeparamref> used to save Aircraft reference to ApplicationUser.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="aircraftId"></param>
        public async Task<Bookmark> CreateBookmarkAsync(string userId, Guid aircraftId)
        {
            var bookmark = new Bookmark
            {
                AircraftId = aircraftId,
                UserId = userId
            };

            await DbContext.AddAsync(bookmark);

            return bookmark;
        }

        /// <summary>
        /// Removes Bookmark used to save Aircraft to User.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="aircraftId"></param>
        public void RemoveBookmarkAsync(Bookmark bookmark)
        {
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

        /// <summary>
        /// Retrieves bookmark referencing User and Aircraft.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="aircraftId"></param>
        /// <returns>Bookmark</returns>
        public async Task<Bookmark> GetBookmarkIdAsync(string userId, string aircraftId)
        {
            var bookmark = await FindByCondition(b =>
                b.UserId == userId && b.AircraftId == Guid.Parse(aircraftId)
            ).FirstOrDefaultAsync();

            if (bookmark == null) {
                return null;
            }

            bookmark.Aircraft = await DbContext.Aircrafts.FindAsync(bookmark.AircraftId);

            return bookmark;
        }
    }
}