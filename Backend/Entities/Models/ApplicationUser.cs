using System.Collections.Generic;
using Entities.Models.Aircrafts;
using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Aircraft> AircraftsOwned { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}
