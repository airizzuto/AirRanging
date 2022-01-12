using System;
using System.Collections.Generic;
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
        
        public uint SavesCount { get; set; }
        public string AuthorUsername { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        // Navigation properties
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ICollection<Landmark> Landmarks { get; set; }
    }
}