using System.Collections.Generic;
using Entities.Models.Aircrafts;
using Entities.Models.Bookmarks;
using Microsoft.AspNetCore.Identity;

namespace Entities.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Aircraft> AircraftsOwned { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}
