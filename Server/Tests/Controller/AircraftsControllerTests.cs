using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using AutoMapper;
using App.Mapping;
using App.Controllers.V1;
using Entities.Models.Aircrafts;
using Tests.Helpers;
using System;
using Entities.Models.Enums;
using Entities.DTOs.V1.Aircrafts;

namespace Tests.Controller
{
  public class AircraftsControllerTests : IntegrationHelper
    {
        private readonly MockAPI _mock = new();
        private readonly MockAircraftsData _mockData = new();

        private readonly AircraftParameters aircraftParameters = new();
        private readonly AircraftsProfile _profile = new();
        private readonly MapperConfiguration mapperConfig;
        private readonly IMapper mapper;

        public AircraftsControllerTests()
        {
            mapperConfig = new MapperConfiguration(cfg => 
                cfg.AddProfile(_profile));
            mapper = new Mapper(mapperConfig);
        }

        /*
            1- GET aircrafts
            TODO: 3- GET aircrafts search
            4- GET aircraft Id
            TODO: 5- GET saved/owned aircrafts
            TODO: 6- POST create aircraft
            TODO: 7- POST clone aicraft
            TODO: 8- PUT update aircraft id
            TODO: 9- DELETE remove aircraft id
        */

        // GET
        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        public async Task GetAllAircrafts_ReturnsCode200Ok(int aircraftNumber)
        {
            // Arrange
            _mock.repo.Setup(repo =>
                repo.Aircraft.GetAllAircraftsAsync()
            ).ReturnsAsync(
                await _mockData.RetrieveAircraftsQuantityAsync(aircraftNumber, aircraftParameters)
            );

            var controller = new AircraftsController(_mock.logger.Object, _mock.repo.Object, mapper);

            // Act
            var result = await controller.GetAllAircrafts();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetAircraftId_ReturnsCode200Ok_WhenAircraftFound()
        {
            // Arrange
            Guid id = Guid.NewGuid();
            Aircraft mockAircraft = new()
            {
                Id = id,
                IcaoId = "C152",
                Manufacturer = "Cessna",
                Model = "152",
                AircraftType = EAircraftType.SingleEngineLand,
                EngineType = EEngineType.Piston,
                WeightCategory = EWeightCategory.Small,
                IcaoWakeCategory = EIcaoWakeCategory.Light,
                FuelType = EFuelType.AvGas,
                MTOW = 1670,
                CruiseSpeed = 107,
                FuelCapacity = 26,
                MaxRange = 415,
                ServiceCeiling = 14700
            };

            _mock.repo.Setup(repo =>
                repo.Aircraft.GetAircraftByIdAsync(id.ToString())
            ).ReturnsAsync(mockAircraft);

            var controller = new AircraftsController(_mock.logger.Object, _mock.repo.Object, mapper);

            // Act
            var result = await controller.GetAircraftById(id.ToString());

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetAircraftId_ReturnsCode404NotFound_WhenAircraftIdNotFound()
        {
            // Arrange
            Guid id = Guid.NewGuid();

            _mock.repo.Setup(repo =>
                repo.Aircraft.GetAircraftByIdAsync(id.ToString())
            );

            var controller = new AircraftsController(_mock.logger.Object, _mock.repo.Object, mapper);

            // Act
            var result = await controller.GetAircraftById(id.ToString());

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetAircraftId_ReturnsCode404NotFound_WhenIdHasIncorrectFormat()
        {
            // Arrange
            string id = "123";

            _mock.repo.Setup(repo =>
                repo.Aircraft.GetAircraftByIdAsync(id.ToString())
            );

            var controller = new AircraftsController(_mock.logger.Object, _mock.repo.Object, mapper);

            // Act
            var result = await controller.GetAircraftById(id.ToString());

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async void Create_WithValidModel_CreatesAircraftOnce()
        {
            // TODO: mock HttpContext call?
            // Arrange
            AircraftCreateDTO mockAircraft = new()
            {
                IcaoId = "C152",
                Manufacturer = "Cessna",
                Model = "152",
                AircraftType = EAircraftType.SingleEngineLand,
                EngineType = EEngineType.Piston,
                WeightCategory = EWeightCategory.Small,
                IcaoWakeCategory = EIcaoWakeCategory.Light,
                FuelType = EFuelType.AvGas,
                MTOW = 1670,
                CruiseSpeed = 107,
                FuelCapacity = 26,
                MaxRange = 415,
                ServiceCeiling = 14700
            };
            var model = mapper.Map<AircraftCreateDTO, Aircraft>(mockAircraft);

            _mock.repo.Setup(repo => repo.Aircraft.CreateAircraftAsync(
                It.IsAny<Aircraft>(), It.IsAny<string>()
            )).ReturnsAsync(model);

            var controller = new AircraftsController(_mock.logger.Object, _mock.repo.Object, mapper);

            // Act
            var result = await controller.CreateAircraft(mockAircraft);

            // Assert
            Assert.IsType<CreatedAtActionResult>(result);
        }
    }
}
