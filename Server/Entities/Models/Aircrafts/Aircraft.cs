using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Entities.Models.Bookmarks;
using Entities.Models.Enums;
using Entities.Models.Identity;

namespace Entities.Models.Aircrafts
{
    public class Aircraft
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

        [Display(Name = "Saves Count")]
        public uint SavesCount { get; set; }

        [Display(Name = "Author Username")]
        public string AuthorUsername { get; set; }

        [Display(Name = "Created At Date")]
        public DateTime CreatedDate { get; set; }
        // public DateTime ModifiedDate { get; set; }

        // Navigation properties
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}