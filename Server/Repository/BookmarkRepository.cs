using System.Collections.Generic;
using System.Threading.Tasks;
using Data;
using Contracts;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Entities.Models.Bookmarks;

namespace Repository
{
    public class BookmarkRepository<T> 
        : BaseRepository<Bookmark<T>>, IBookmarkRepository<T>
    {
        public BookmarkRepository(ApplicationDbContext context) : base(context)
        { }

        /// <summary>
        /// Creates a new <typeparamref name="Bookmark">Bookmark</typeparamref> used to save Resource reference to ApplicationUser.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="resourceId"></param>
        public async Task<Bookmark<T>> CreateBookmarkAsync(string userId, string resourceId)
        {
            var bookmark = new Bookmark<T>
            {
                ResourceId = Guid.Parse(resourceId),
                UserId = userId
            };

            await DbContext.AddAsync(bookmark);

            return bookmark;
        }

        /// <summary>
        /// Creates a new <typeparamref name="Bookmark">Bookmark</typeparamref> used to save Resource reference to ApplicationUser.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="resourceId"></param>
        public async Task<Bookmark<T>> CreateBookmarkAsync(string userId, Guid resourceId)
        {
            var bookmark = new Bookmark<T>
            {
                ResourceId = resourceId,
                UserId = userId
            };

            await DbContext.AddAsync(bookmark);

            return bookmark;
        }

        /// <summary>
        /// Removes Bookmark used to save Resource to User.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="resourceId"></param>
        public void RemoveBookmarkAsync(Bookmark<T> bookmark)
        {
            DbContext.Remove(bookmark);
        }

        /// <summary>
        /// Retrieves all Bookmarks in repository.
        /// </summary>
        /// <returns>Bookmarks</returns>
        public async Task<IEnumerable<Bookmark<T>>> GetAllResourceTypeBookmarksAsync()
        {
            return await FindAll().ToListAsync();
        }

        /// <summary>
        /// Retrieves all resources bookmarked by user.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Resources</returns>
        public async Task<IEnumerable<T>> GetUserResourceTypeBookmarkedAsync(string userId)
        {
            return await FindByCondition(b => b.UserId == userId)
                .Select(b => b.Resource)
                .ToListAsync();
        }

        /// <summary>
        /// Retrieves bookmark referencing User and Resource.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="resourceId"></param>
        /// <returns>Bookmark</returns>
        public async Task<Bookmark<T>> GetUserResourceTypeBookmarkIdAsync(string userId, string resourceId)
        {
            return await FindByCondition(b =>
                b.UserId == userId && b.ResourceId == Guid.Parse(resourceId)
            ).FirstOrDefaultAsync();
        }
    }
}