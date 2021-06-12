using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Aircraft> UserAircrafts { get; set; }
        public virtual ICollection<Aircraft> SavedAircrafts { get; set; }
    }
}