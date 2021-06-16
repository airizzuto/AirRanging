using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Aircraft> Aircrafts { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}
