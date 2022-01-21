using System.Collections.Generic;
using System.Linq;
using Entities.Models.Aircrafts;
using Entities.Models.Enums;

namespace Entities.Helpers.Aircrafts
{
  public class AircraftsFilterHelper : IAircraftsFilterHelper
    {
        public IEnumerable<Aircraft> ApplyFilter(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters)
        {
            var filteredAircrafts = aircrafts;

            FilterByIcaoId(ref filteredAircrafts, parameters.IcaoId);
            FilterByManufacturer(ref filteredAircrafts, parameters.Manufacturer);
            FilterByModel(ref filteredAircrafts, parameters.Model);
            FilterByVariant(ref filteredAircrafts, parameters.Variant);
            FilterByAircraftType(ref filteredAircrafts, parameters.AircraftType);
            FilterByEngineCount(ref filteredAircrafts, parameters.EngineCount);
            FilterByEngineType(ref filteredAircrafts, parameters.EngineType);
            FilterByFuelType(ref filteredAircrafts, parameters.FuelType);
            FilterByGreaterThanMaxRange(ref filteredAircrafts, parameters.MaxRange);
            FilterByLessThanMinRunwayLength(ref filteredAircrafts, parameters.MinRunwayLength);
            FilterByWeightCategory(ref filteredAircrafts, parameters.WeightCategory);
            FilterByAuthor(ref filteredAircrafts, parameters.AuthorUsername);

            return filteredAircrafts;
        }

        private static void FilterByIcaoId(
            ref IEnumerable<Aircraft> aircrafts, string icaoId)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(icaoId)) return;

            aircrafts = aircrafts.Where(
                a => a.IcaoId.ToUpper().Contains(icaoId.Trim().ToUpper())
            );
        }

        private static void FilterByManufacturer(
            ref IEnumerable<Aircraft> aircrafts, string manufacturer)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(manufacturer)) return;

            aircrafts = aircrafts.Where(
                a => a.Manufacturer.ToUpper().Contains(manufacturer.Trim().ToUpper()));
        }

        private static void FilterByModel(
            ref IEnumerable<Aircraft> aircrafts, string model)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(model)) return;

            aircrafts = aircrafts.Where(
                a => a.Model.ToUpper().Contains(model.Trim().ToUpper()));
        }

        private static void FilterByVariant(
            ref IEnumerable<Aircraft> aircrafts, string variant)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(variant)) return;

            aircrafts = aircrafts.Where(
                a => a.Variant.ToUpper().Contains(variant.Trim().ToUpper()));
        }

        private static void FilterByAircraftType(
            ref IEnumerable<Aircraft> aircrafts, EAircraftType aircraftType)
        {
            if (!aircrafts.Any() || aircraftType == EAircraftType.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.AircraftType == aircraftType);
        }

        private static void FilterByEngineType(
            ref IEnumerable<Aircraft> aircrafts, EEngineType engineType)
        {
            if (!aircrafts.Any() || engineType == EEngineType.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.EngineType == engineType);
        }

        private static void FilterByEngineCount(
            ref IEnumerable<Aircraft> aircrafts, uint engineCount)
        {
            if (!aircrafts.Any() || engineCount == 0) return;

            aircrafts = aircrafts.Where(a => a.EngineCount == engineCount);
        }

        private static void FilterByWeightCategory(
            ref IEnumerable<Aircraft> aircrafts, EWeightCategory weightCategory)
        {
            if (!aircrafts.Any() || weightCategory == EWeightCategory.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.WeightCategory == weightCategory);
        }

        private static void FilterByFuelType(
            ref IEnumerable<Aircraft> aircrafts, EFuelType fuelType)
        {
            if (!aircrafts.Any() || fuelType == EFuelType.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.FuelType == fuelType);
        }

        private static void FilterByGreaterThanMaxRange(
            ref IEnumerable<Aircraft> aircrafts, uint maxRange)
        {
            if (!aircrafts.Any() || maxRange == 0) return;

            aircrafts = aircrafts.Where(a => a.MaxRange >= maxRange);
        }

        private static void FilterByLessThanMinRunwayLength(
            ref IEnumerable<Aircraft> aircrafts, uint minRunwayLength)
        {
            if (!aircrafts.Any() || minRunwayLength == 0) return;

            aircrafts = aircrafts.Where(a => a.MinRunwayLength <= minRunwayLength);
        }

        private static void FilterByAuthor(
            ref IEnumerable<Aircraft> aircrafts, string authorUsername)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(authorUsername)) return;

            aircrafts = aircrafts.Where(
                a => a.User.NormalizedUserName.Contains(
                    authorUsername.Trim().ToUpper())
            );
        }
    }
}