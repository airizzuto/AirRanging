using System;
using System.Collections.Generic;
using Entities.Models.Bookmarks;
using Entities.Models.Enums;
using Entities.Models.Identity;

namespace Entities.Models.Aircrafts
{
    public class Aircraft
    {
        public Guid Id { get; set; }
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public string Registration { get; set; }
        public EAircraftType AircraftType { get; set; }
        public EEngineType EngineType { get; set; }
        public ushort EngineCount { get; set; }
        public EWeightCategory WeightCategory { get; set; }
        public EIcaoWakeCategory IcaoWakeCategory { get; set; }
        public EFuelType FuelType { get; set; }
        public uint MaxTakeoffWeight { get; set; }
        public uint MinRunwayLength { get; set; }
        public int CruiseSpeed { get; set; }
        public decimal FuelCapacity { get; set; }
        public decimal MaxRange { get; set; }
        public uint ServiceCeiling { get; set; }
        public int EnteredServiceAtYear { get; set; }

        public uint SavesCount { get; set; }
        public string AuthorUsername { get; set; }
        public DateTime CreatedDate { get; set; }
        // public DateTime ModifiedDate { get; set; }

        // Navigation properties
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}