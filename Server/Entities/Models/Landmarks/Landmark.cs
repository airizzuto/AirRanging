using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Entities.Models.Enums;
using Entities.Models.Identity;

namespace Entities.Models.Landmarks
{
    public class Landmark
    {
        public Guid Id { get; set; }

        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public int Altitude { get; set; }

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

        public ICollection<Landmark> Landmarks { get; set; }
    }
}