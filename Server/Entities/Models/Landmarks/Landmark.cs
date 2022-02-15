using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Entities.Models.Bookmarks;
using Entities.Models.Enums.Landmarks;
using Entities.Models.Identity;

namespace Entities.Models.Landmarks
{
    public class Landmark
    {
        public Guid Id { get; set; }

        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }

        [Display(Name = "Created At Date")]
        public DateTime CreatedDate { get; set; }

        [Display(Name = "Modified At Date")]
        public DateTime ModifiedDate { get; set; }

        [Display(Name = "Saves Count")]
        public uint SavesCount { get; set; }

        [Display(Name = "Author Username")]
        public string AuthorUsername { get; set; }

        // Navigation properties
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Bookmark<Landmark>> LandmarkBookmarks { get; set; }
    }
}