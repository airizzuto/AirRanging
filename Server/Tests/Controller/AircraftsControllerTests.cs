using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using AutoMapper;
using App.Mapping;
using App.Controllers.V1;
using Entities.Models.Aircrafts;
using Entities.DTOs.V1.Aircrafts;
using Tests.Helpers;
using System;
using Entities.Models.Enums;

namespace Tests.Controller
{
  public class AircraftsControllerTests : IntegrationTest
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

        // TODO: Refactor to current interfaces
        // TODO: Refactor with claims
        // TODO: Additional testing

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
                MaxTakeoffWeight = 1670,
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

        // DEPRECATED
        
        // #region Integration Testing

        // [Fact]
        // public async Task GetAll_Returns200OK()
        // {
        //     // Arrange
        //     await AuthenticateAsync();

        //     // Act
        //     var response = await TestClient.GetAsync("/api/aircrafts");

        //     // Assert
        //     response.StatusCode.Should().Be(HttpStatusCode.OK);
        //     (await response.Content.ReadAsAsync<List<Aircraft>>()).Should().AllBeOfType<Aircraft>();
        // }

        // [Fact]
        // public async Task Aircraft_ReturnsAircraft_WhenAircraftExistsInDb()
        // {
        //     // Arrange
        //     await AuthenticateAsync();
        //     var createdAircraft = await CreateAircraftAsync(new AircraftCreateDTO 
        //     {
        //         Id = Guid.NewGuid(),
        //         IcaoId = "C152",
        //         Manufacturer = "Cessna",
        //         Model = "152",
        //         AircraftType = EAircraftType.SingleEngineLand,
        //         EngineType = EEngineType.Piston,
        //         WeightCategory = EWeightCategory.Small,
        //         IcaoWakeCategory = EIcaoWakeCategory.Light,
        //         FuelType = EFuelType.AvGas,
        //         MaxTakeoffWeight = 1670,
        //         CruiseSpeed = 107,
        //         FuelCapacity = 26,
        //         MaxRange = 415,
        //         ServiceCeiling = 14700
        //     });

        //     // Act
        //     var response = await TestClient.GetAsync(
        //         "/api/aircrafts/{id}".Replace("{id}", createdAircraft.Id.ToString()
        //     ));

        //     // Assert
        //     response.StatusCode.Should().Be(HttpStatusCode.OK);
        //     var returnedAircraft = await response.Content.ReadAsAsync<AircraftReadDTO>();
        //     returnedAircraft.Id.Should().Be(createdAircraft.Id);
        //     returnedAircraft.IcaoId.Should().Be(createdAircraft.IcaoId);
        // }
        // #endregion

        // // #region GetAll
        // [Fact]
        // public async Task GetAllAircraftsAsync_Returns200OK_WhenDBIsEmpty()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo => 
        //         repo.Aircraft.GetAllAircraftsAsync(_mock.aircraftParameters))
        //         .ReturnsAsync(await _mockData.RetrieveAircraftsQuantity(0, _mock.aircraftParameters));

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.GetAllAircrafts(_mock.aircraftParameters);

        //     // Assert
        //     Assert.IsType<OkObjectResult>(result.Result);
        // }

        // [Fact]
        // public async Task GetAllAircraftsAsync_ReturnsOneItem_WhenDBHasOneResource()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo =>
        //         repo.Aircraft.GetAllAircraftsAsync(
        //             _mock.aircraftParameters)
        //         ).ReturnsAsync(
        //             await _mockData.RetrieveAircraftsQuantity(1, _mock.aircraftParameters)
        //         );

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.GetAllAircrafts(_mock.aircraftParameters);

        //     // Assert
        //     var okResult = result.Result as OkObjectResult;

        //     var aircraft = okResult.Value as List<AircraftReadDTO>;

        //     Assert.Single(aircraft);
        // }

        // [Fact]
        // public async Task GetAllAircraftsAsync_Returns200OK_WhenDBHasOneResource()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo => repo.Aircraft.GetAllAircraftsAsync())
        //         .ReturnsAsync(_mockData.RetrieveAircraftsQuantity(1));

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.GetAllAircrafts();

        //     // Assert;
        //     Assert.IsType<OkObjectResult>(result.Result);
        // }

        // [Fact]
        // public async Task GetAllAircraftsAsync_ReturnsCorrectType_WhenDBHasOneResource()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo => repo.Aircraft.GetAllAircraftsAsync())
        //         .ReturnsAsync(_mockData.RetrieveAircraftsQuantity(1));

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.GetAllAircrafts();

        //     // Assert;
        //     Assert.IsType<ActionResult<IEnumerable<AircraftReadDTO>>>(result);
        // }

        // #endregion

        // #region GetById

        // [Fact]
        // public async Task GetAircraftByIdAsync_Returns404NotFound_WhenNonExistentIDProvided()
        // {
        //     // Arrange
        //     Guid mockGuid = Guid.NewGuid();

        //     _mock.repo.Setup(repo =>
        //         repo.Aircraft.GetAircraftByIdAsync(mockGuid)
        //     ).Returns(() => null);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.GetAircraftById(mockGuid);

        //     // Assert
        //     Assert.IsType<NotFoundResult>(result);
        // }

        // [Fact]
        // public async Task GetAircraftByIdAsync_Returns200OK_WhenValidIDProvided()
        // {
        //     // Arrange
        //     var target = _mockData.RetrieveAircraftNum(0);

        //     _mock.repo.Setup(repo =>
        //         repo.Aircraft.GetAircraftByIdAsync(target.Id)
        //     ).ReturnsAsync(target);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.GetAircraftById(target.Id);

        //     // Assert
        //     Assert.IsType<OkObjectResult>(result);
        // }

        // [Fact]
        // public async Task GetAircraftByIdAsync_ReturnsCorrectType_WhenValidIDProvided()
        // {
        //     // Arrange
        //     var target = _mockData.RetrieveAircraftNum(1);

        //     _mock.repo.Setup(repo =>
        //         repo.Aircraft.GetAircraftByIdAsync(target.Id)
        //     ).ReturnsAsync(target);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.GetAircraftById(target.Id);

        //     // Assert
        //     Assert.IsType<ActionResult<AircraftReadDTO>>(result);
        // }

        // #endregion

        // #region Create

        // [Fact]
        // public async Task CreateAircraftAsync_ReturnsCorrectResourceType_WhenValidObjectSubmitted()
        // {
        //     // Arrange
        //     var target = _mockData.RetrieveAircraftNum(1);

        //     _mock.repo.Setup(repo =>
        //         repo.Aircraft.GetAircraftByIdAsync(target.Id)
        //     ).ReturnsAsync(target);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.CreateAircraft(new AircraftCreateDTO { });

        //     // Assert
        //     Assert.IsType<ActionResult<AircraftReadDTO>>(result);
        // }

        // [Fact]
        // public async Task CreateAircraftAsync_Returns201Created_WhenValidObjectSubmitted()
        // {
        //     // Arrange
            
        //     _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
        //         .ReturnsAsync(_mockData.aircraft1);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.CreateAircraft(new AircraftCreateDTO { });

        //     // Assert
        //     Assert.IsType<CreatedAtRouteResult>(result.Result);
        // }
        
        // #endregion

        // #region Full Update

        // [Fact]
        // public async Task UpdateAircraft_Returns204NoContent_WhenValidObjectSubmitted()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
        //         .ReturnsAsync(_mockData.aircraft1);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.UpdateAircraft(1, new AircraftUpdateDTO { });

        //     // Assert
        //     Assert.IsType<NoContentResult>(result);
        // }

        // [Fact]
        // public async Task UpdateAircraft_Returns404NotFound_WhenNonExistentResourceIdSubmitted()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
        //         .ReturnsAsync(() => null);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.UpdateAircraft(1, new AircraftUpdateDTO { });

        //     // Assert
        //     Assert.IsType<NotFoundResult>(result);
        // }

        // #endregion
    
        // #region Partial Update

        // [Fact]
        // public async Task PartialUpdateAircraft_Returns404NotFound_WhenNonExistingResourceIDSubmitted()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
        //         .ReturnsAsync(() => null);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.PartialUpdateAircraft(1,
        //         new Microsoft.AspNetCore.JsonPatch.JsonPatchDocument<AircraftUpdateDTO> { }
        //     );

        //     // Assert
        //     Assert.IsType<NotFoundResult>(result);
        // }

        // #endregion
    
        // #region Delete

        // [Fact]
        // public async Task DeleteAircraft_Returns204NoContent_WhenValidResourceIDSubmitted()
        // {
        //     // Arrange
        //     _mock.repo.Setup(repo => 
        //         repo.GetAircraftByIdAsync(1)).ReturnsAsync(_mockData.aircraft1);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.DeleteAircraft(1);

        //     // Assert
        //     Assert.IsType<NoContentResult>(result);
        // }

        // [Fact]
        // public async Task DeleteAircraft_Returns404NotFound_WhenNonExistentResourceIDSubmitted()
        // {
        //     // Arrange
        //     var randomId = Guid.NewGuid();
        //     _mock.repo.Setup(repo =>
        //         repo.Aircraft.GetAircraftByIdAsync(randomId))
        //             .ReturnsAsync((Aircraft)null);

        //     var controller = new AircraftsController(
        //         _mock.logger.Object,
        //         _mock.repo.Object,
        //         _mock.mapper
        //     );

        //     // Act
        //     var result = await controller.DeleteAircraft(randomId);

        //     // Assert
        //     Assert.IsType<NotFoundResult>(result);
        // }
        // #endregion
    }
}
