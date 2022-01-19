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
        Task<IEnumerable<T>> GetUserResourceTypeBookmarkedAsync(string userId);
        Task<Bookmark<T>> GetUserResourceTypeBookmarkIdAsync(string userId, string resourceId);
    }
}