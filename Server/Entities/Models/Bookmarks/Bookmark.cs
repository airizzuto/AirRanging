using System;
using Entities.Models.Identity;

namespace Entities.Models.Bookmarks
{
    public class Bookmark<T>
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid ResourceId { get; set; }
        public T Resource { get; set; }
    }
}