using System;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.Enums;
using API.Models.Identity;

namespace API.Models
{
    public class Aircraft
    {
        public Guid AircraftID { get; set; }
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


        // TODO: Add username reference. To indicate who is the user that created the aircraft when searching or selecting.
        public string AuthorID { get; set; }
        public virtual ApplicationUser Author { get; set; }
    }
}