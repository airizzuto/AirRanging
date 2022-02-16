using System;
using System.ComponentModel.DataAnnotations;
using Entities.Models.Enums;

namespace Entities.Models.Aircrafts
{
    public class Aircraft : UserResourceData<Aircraft>
    {
        public Guid Id { get; set; }

        [Display(Name = "ICAO ID")]
        public string IcaoId { get; set; }

        public string Manufacturer { get; set; }

        public string Model { get; set; }

        public string Variant { get; set; }

        public string Registration { get; set; }

        [Display(Name = "Aircraft Type")]
        public EAircraftType AircraftType { get; set; }

        [Display(Name = "Engine Type")]
        public EEngineType EngineType { get; set; }

        [Display(Name = "Engine Count")]
        public ushort EngineCount { get; set; }

        [Display(Name = "Weight Category")]
        public EWeightCategory WeightCategory { get; set; }

        [Display(Name = "ICAO Wake Category")]
        public EIcaoWakeCategory IcaoWakeCategory { get; set; }

        [Display(Name = "Fuel Type")]
        public EFuelType FuelType { get; set; }

        [Display(Name = "Maximum Takeoff Weight")]
        public uint MTOW { get; set; }

        [Display(Name = "Minimum Runway Length")]
        public uint MinRunwayLength { get; set; }

        [Display(Name = "Cruise Speed")]
        public int CruiseSpeed { get; set; }

        [Display(Name = "Fuel Capacity")]
        public decimal FuelCapacity { get; set; }

        [Display(Name = "Maximum Range")]
        public decimal MaxRange { get; set; }

        [Display(Name = "Cervice Ceiling")]
        public uint ServiceCeiling { get; set; }

        [Display(Name = "Entered Service At Year")]
        public int EnteredServiceAtYear { get; set; }
    }
}