using System;
using Entities.Models.Enums;
using Entities.Models.Identity;

namespace Entities.DTOs.V1.Aircrafts
{
    public class AircraftUpdateDTO
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
        public uint MTOW { get; set; }
        public uint MinRunwayLength { get; set; }
        public int CruiseSpeed { get; set; }
        public decimal FuelCapacity { get; set; }
        public decimal MaxRange { get; set; }
        public uint ServiceCeiling { get; set; }
        public int EnteredServiceAtYear { get; set; }

        public int SavesCount { get; set; }
        public string AuthorUsername { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}