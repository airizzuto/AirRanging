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
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public int Altitude { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public uint SavesCount { get; set; }
        public string AuthorUsername { get; set; }
    }
}