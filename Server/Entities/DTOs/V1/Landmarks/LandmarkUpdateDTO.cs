using System;
using System.Collections.Generic;
using Entities.Models.Bookmarks;
using Entities.Models.Enums.Landmarks;
using Entities.Models.Identity;
using Entities.Models.Landmarks;

namespace Entities.DTOs.V1.Landmarks
{
    public class LandmarkUpdateDTO
    {
        public Guid Id { get; set; }

        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
        public string ImageUrl { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public uint SavesCount { get; set; }
        public string AuthorUsername { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Bookmark<Landmark>> LandmarkBookmarks { get; set; }
    }
}