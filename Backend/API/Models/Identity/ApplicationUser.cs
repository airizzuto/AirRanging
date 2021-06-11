using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Aircraft> UserAircrafts { get; set; }
        public ICollection<Aircraft> SavedAircrafts { get; set; }
    }
}