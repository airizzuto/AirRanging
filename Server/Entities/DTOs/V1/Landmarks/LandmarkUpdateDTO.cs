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
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Altitude { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public uint SavesCount { get; set; }
        public string AuthorUsername { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Bookmark<Landmark>> LandmarkBookmarks { get; set; }
    }
}