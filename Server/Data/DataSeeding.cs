using System;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using Entities.Models.Aircrafts;
using Entities.Models.Enums;
using Entities.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace Data
{
    public static class DataSeeding
    {
        public static async Task SeedDefaultUser(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            if (context.Users.Any())
            {
                return; // Users already seeded
            }

            var defaultUser = new ApplicationUser
            {
                UserName = Authorization.default_username,
                Email = Authorization.default_email,
                EmailConfirmed = true,
            };

            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                await userManager.CreateAsync(defaultUser, Authorization.default_password);
                await userManager.AddToRoleAsync(defaultUser, Authorization.default_role.ToString());
            }
        }

        public static async Task SeedMockUsers(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            if (context.Users.Any())
            {
                return; // Users already seeded
            }

            var mockUsers = new ApplicationUser[]
            {
                new ApplicationUser {
                    UserName = "lskywalker",
                    Email = "lukeskywalker@mockemail.mock",
                    EmailConfirmed = true,
                },
                new ApplicationUser {
                    UserName = "owkenobi",
                    Email = "benkenobi@mockemail.mock",
                    EmailConfirmed = true,
                },
                new ApplicationUser {
                    UserName = "jholden",
                    Email = "jamesholden@mockemail.mock",
                    EmailConfirmed = true,
                }
            };

            foreach (var user in mockUsers)
            {
                await userManager.CreateAsync(user, Authorization.default_password);
                await userManager.AddToRoleAsync(user, Authorization.default_role.ToString());
            }
        }

        public static async Task SeedExamples(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            if (context.Aircrafts.Any())
            {
                return;  // Aircrafts already seeded
            }

            var aircrafts = new Aircraft[]
            {
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "C152",
                    Manufacturer = "Cessna",
                    Model = "152",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 1670,
                    CruiseSpeed = 107,
                    FuelCapacity = 26,
                    MaxRange = 415,
                    ServiceCeiling = 14700,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "C152",
                    Manufacturer = "Cessna",
                    Model = "152",
                    Variant = "Long-Range",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 1670,
                    CruiseSpeed = 107,
                    FuelCapacity = 38,
                    MaxRange = 691,
                    ServiceCeiling = 14700,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "C172",
                    Manufacturer = "Cessna",
                    Model = "172",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 2450,
                    CruiseSpeed = 122,
                    FuelCapacity = 56,
                    MaxRange = 696,
                    ServiceCeiling = 13500,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "A320",
                    Manufacturer = "Airbus",
                    Model = "320",
                    AircraftType = EAircraftType.MultiEngineLand,
                    EngineType = EEngineType.Jet,
                    EngineCount = 2,
                    WeightCategory = EWeightCategory.Large,
                    IcaoWakeCategory = EIcaoWakeCategory.Medium,
                    FuelType = EFuelType.JetA,
                    MaxTakeoffWeight = 172000,
                    CruiseSpeed = 447,
                    FuelCapacity = 6400,
                    MaxRange = 3300,
                    ServiceCeiling = 39100,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "B738",
                    Manufacturer = "Boeing",
                    Model = "737-800",
                    AircraftType = EAircraftType.MultiEngineLand,
                    EngineType = EEngineType.Jet,
                    EngineCount = 2,
                    WeightCategory = EWeightCategory.Large,
                    IcaoWakeCategory = EIcaoWakeCategory.Medium,
                    FuelType = EFuelType.JetA,
                    MaxTakeoffWeight = 144500,
                    CruiseSpeed = 453,
                    FuelCapacity = 6875,
                    MaxRange = 2935,
                    ServiceCeiling = 41000,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "F18",
                    Manufacturer = "McDonnell Douglas",
                    Model = "F/A-18C",
                    Variant = "Combat",
                    Registration = "",
                    AircraftType = EAircraftType.MultiEngineLand,
                    EngineType = EEngineType.Jet,
                    EngineCount = 2,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.JetA,
                    MaxTakeoffWeight = 51900,
                    CruiseSpeed = 570,
                    FuelCapacity = 10870,
                    MaxRange = 400,
                    ServiceCeiling = 50000,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
            new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "A4",
                    Manufacturer = "McDonnell Douglas",
                    Model = "A-4E Skyhawk",
                    Variant = "Empty Loadout",
                    Registration = "",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Jet,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.JetA,
                    MaxTakeoffWeight = 24500,
                    CruiseSpeed = 250,
                    FuelCapacity = 810,
                    MaxRange = 1008,
                    ServiceCeiling = 40000,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "C130",
                    Manufacturer = "Lockheed",
                    Model = "C-130H",
                    Variant = "Max. Load",
                    Registration = "",
                    AircraftType = EAircraftType.MultiEngineLand,
                    EngineType = EEngineType.TurbopropTurboshaft,
                    EngineCount = 4,
                    WeightCategory = EWeightCategory.Large,
                    IcaoWakeCategory = EIcaoWakeCategory.Medium,
                    FuelType = EFuelType.JetA,
                    MaxTakeoffWeight = 155000,
                    CruiseSpeed = 292,
                    FuelCapacity = 60000,
                    MaxRange = 2050,
                    ServiceCeiling = 23000,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "C210",
                    Manufacturer = "Cessna",
                    Model = "T210N Turbo Centurion II",
                    Variant = "",
                    Registration = "",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 4000,
                    CruiseSpeed = 193,
                    FuelCapacity = 87,
                    MaxRange = 900,
                    ServiceCeiling = 27000,
                    AuthorUsername = Authorization.default_username,
                    User = await userManager.FindByNameAsync(Authorization.default_username)
                },
            };

            await context.AddRangeAsync(aircrafts);

            await context.SaveChangesAsync();
        }
    }
}