using API.Controllers;
using API.Domain.Repositories;
using Moq;
using AutoMapper;
using Xunit;
using System.Collections.Generic;
using API.Domain.Models;
using API.Domain.Models.Enums;
using API.Mapping;
using API.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using API.Tests.Helpers;

namespace AirRangingAPI.Tests
{
    public class AircraftsControllerTests
    {
        private MockAPI _mock = new MockAPI();
        private static List<Aircraft> GetAircrafts(int num)
        {
            var aircrafts = new List<Aircraft>();
            if (num > 0)
            {
                aircrafts.Add(new Aircraft
                {
                    Id = 0,
                    IcaoId = "C152",
                    Manufacturer = "Cessna",
                    Model = "152",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 1670,
                    CruiseSpeed = 107,
                    FuelCapacity = 26,
                    MaxRange = 415,
                    ServiceCeiling = 14700
                });
            }

            return aircrafts;
        }

        [Fact]
        public void GetAllAircrafts_Returns200OK_WhenDBIsEmpty()  // FIXME
        {
            // Arrange
            _mock.service.Setup(service => service.GetAllAsync())
                .ReturnsAsync(GetAircrafts(0));

            var controller = new AircraftsController(
                _mock.service.Object, _mock.mapper);

            // Act
            var result = controller.GetAllAircrafts();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }
    }
}
