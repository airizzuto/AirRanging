using System;
using Entities.Models.Enums.Landmarks;

namespace Entities.DTOs.V1.Landmarks
{
    public class LandmarkReadDTO
    {
        public Guid Id { get; set; }
        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ImageUrl { get; set; }

        public uint SavesCount { get; set; }
        public string AuthorUsername { get; set; }
    }
}