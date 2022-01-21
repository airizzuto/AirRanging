using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models.Bookmarks;

namespace Contracts
{
    public interface IBookmarkRepository<T> : IBaseRepository<Bookmark<T>>
    {
        Task<Bookmark<T>> CreateBookmarkAsync(string userId, string resourceId);
        Task<Bookmark<T>> CreateBookmarkAsync(string userId, Guid resourceId);

        void RemoveBookmarkAsync(Bookmark<T> bookmark);

        Task<IEnumerable<Bookmark<T>>> GetAllResourceTypeBookmarksAsync();
        Task<IEnumerable<T>> GetUserResourcesBookmarkedAsync(string userId);
        Task<Bookmark<T>> GetUserResourceBookmarkIdAsync(string userId, string resourceId);
    }
}