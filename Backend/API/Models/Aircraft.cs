using System.ComponentModel.DataAnnotations.Schema;
using API.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class Aircraft
    {
        public int Id { get; set; }
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


        public string UserId { get; set; }
        public string Username { get; set; }

        // TODO: Add username reference. To indicate who is the user that created the aircraft when searching or selecting.

        [ForeignKey(nameof(UserId))]
        public virtual IdentityUser User { get; set; }
    }
}