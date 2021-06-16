using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Models.Enums;

namespace Entities.Models
{
    public class Aircraft
    {
        public Guid AircraftId { get; set; }
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public string Registration { get; set; }
        public EAircraftType AircraftType { get; set; }
        public EEngineType EngineType { get; set; }
        public short EngineCount { get; set; }
        public EWeightCategory WeightCategory { get; set; }
        public EIcaoWakeCategory IcaoWakeCategory { get; set; }
        public EFuelType FuelType { get; set; }
        public int MaxTakeoffWeight { get; set; }

        // MinRunwayLength int { get; set; }

        // MaxRunwayLength int { get; set; }

        public int CruiseSpeed { get; set; }
        public decimal FuelCapacity { get; set; }
        public decimal MaxRange { get; set; }
        public int ServiceCeiling { get; set; }
        public int SavesCount { get; set; }

        [DisplayName("Author")]
        public virtual string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        [DisplayName("Author")]
        public virtual ApplicationUser User { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}