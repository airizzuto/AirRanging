using System;
using Entities.Models.Enums;

namespace Entities.DTOs.V1.Landmarks
{
    public class LandmarkReadDTO
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
    }
}