using System;
using System.Collections.Generic;
using Entities.Models.Aircrafts;
using Entities.Models.Bookmarks;
using Entities.Models.Landmarks;
using Microsoft.AspNetCore.Identity;

namespace Entities.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenCreationTime { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public bool UsedToken { get; set; }  // If not in use no need to refresh
        public bool TokenInvalidated { get; set; }  // In case of change of email/password or security issues

        // Navigation Properties
        public ICollection<Aircraft> AircraftsOwned { get; set; }
        public ICollection<Landmark> LandmarksOwned { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}
