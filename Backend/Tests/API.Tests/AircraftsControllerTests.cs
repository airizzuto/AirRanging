using API.Controllers;
using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using API.Tests.Helpers;
using System.Threading.Tasks;
using System.Collections.Generic;
using API.DTOs.Aircraft;

namespace AirRangingAPI.Tests
{
    public class AircraftsControllerTests
    {
        private MockAPI _mock = new();
        private MockAircraftsData _mockData = new();

        #region GetAll

        [Fact]
        public async Task GetAllAircraftsAsync_Returns200OK_WhenDBIsEmpty()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAllAircraftsAsync())
                .ReturnsAsync(_mockData.GetAircrafts(0));

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper);

            // Act
            var result = await controller.GetAllAircrafts();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetAllAircraftsAsync_ReturnsOneItem_WhenDBHasOneResource()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAllAircraftsAsync())
                .ReturnsAsync(_mockData.GetAircrafts(1));

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper);

            // Act
            var result = await controller.GetAllAircrafts();

            // Assert
            var okResult = result.Result as OkObjectResult;

            var aircraft = okResult.Value as List<AircraftReadDTO>;

            Assert.Single(aircraft);
        }

        [Fact]
        public async Task GetAllAircraftsAsync_Returns200OK_WhenDBHasOneResource()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAllAircraftsAsync())
                .ReturnsAsync(_mockData.GetAircrafts(1));

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper);

            // Act
            var result = await controller.GetAllAircrafts();

            // Assert;
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetAllAircraftsAsync_ReturnsCorrectType_WhenDBHasOneResource()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAllAircraftsAsync())
                .ReturnsAsync(_mockData.GetAircrafts(1));

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.GetAllAircrafts();

            // Assert;
            Assert.IsType<ActionResult<IEnumerable<AircraftReadDTO>>>(result);
        }

        #endregion

        #region GetById

        [Fact]
        public async Task GetAircraftByIdAsync_Returns404NotFound_WhenNonExistentIDProvided()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(0))
                .Returns(() => null);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.GetAircraftById(1);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetAircraftByIdAsync_Returns200OK_WhenValidIDProvided()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
                .ReturnsAsync(_mockData.mockAircraft1);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.GetAircraftById(1);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetAircraftByIdAsync_ReturnsCorrectType_WhenValidIDProvided()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
                .ReturnsAsync(_mockData.mockAircraft1);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.GetAircraftById(1);

            // Assert
            Assert.IsType<ActionResult<AircraftReadDTO>>(result);
        }

        #endregion

        #region Create

        [Fact]
        public async Task CreateAircraftAsync_ReturnsCorrectResourceType_WhenValidObjectSubmitted()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
                .ReturnsAsync(_mockData.mockAircraft1);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.CreateAircraft(new AircraftCreateDTO { });

            // Assert
            Assert.IsType<ActionResult<AircraftReadDTO>>(result);
        }

        [Fact]
        public async Task CreateAircraftAsync_Returns201Created_WhenValidObjectSubmitted()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
                .ReturnsAsync(_mockData.mockAircraft1);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.CreateAircraft(new AircraftCreateDTO { });

            // Assert
            Assert.IsType<CreatedAtRouteResult>(result.Result);
        }
        
        #endregion

        #region Update

        // TODO

        #endregion
    }
}
