using API.Controllers.V1;
using API.DTOs.V1.Aircraft;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using API.Tests.Helpers;

namespace AirRangingAPI.Tests
{
    public class AircraftsControllerTests
    {
        private MockAPI _mock = new();
        private MockAircraftsData _mockData = new();

        // TODO: Refactor to current interfaces
        // TODO: additional testing

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
                .ReturnsAsync(_mockData.aircraft1);

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
                .ReturnsAsync(_mockData.aircraft1);

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
                .ReturnsAsync(_mockData.aircraft1);

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
                .ReturnsAsync(_mockData.aircraft1);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.CreateAircraft(new AircraftCreateDTO { });

            // Assert
            Assert.IsType<CreatedAtRouteResult>(result.Result);
        }
        
        #endregion

        #region Full Update

        [Fact]
        public async Task UpdateAircraft_Returns204NoContent_WhenValidObjectSubmitted()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
                .ReturnsAsync(_mockData.aircraft1);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.UpdateAircraft(1, new AircraftUpdateDTO { });

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task UpdateAircraft_Returns404NotFound_WhenNonExistentResourceIdSubmitted()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
                .ReturnsAsync(() => null);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.UpdateAircraft(1, new AircraftUpdateDTO { });

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        #endregion
    
        #region Partial Update

        [Fact]
        public async Task PartialUpdateAircraft_Returns404NotFound_WhenNonExistingResourceIDSubmitted()
        {
            // Arrange
            _mock.repo.Setup(repo => repo.GetAircraftByIdAsync(1))
                .ReturnsAsync(() => null);

            var controller = new AircraftsController(
                _mock.repo.Object, _mock.mapper
            );

            // Act
            var result = await controller.PartialUpdateAircraft(1,
                new Microsoft.AspNetCore.JsonPatch.JsonPatchDocument<AircraftUpdateDTO> { }
            );

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        #endregion
    
        #region Delete

        [Fact]
        public async Task DeleteAircraft_Returns204NoContent_WhenValidResourceIDSubmitted()
        {
            // Arrange
            _mock.repo.Setup(repo => 
                repo.GetAircraftByIdAsync(1)).ReturnsAsync(_mockData.aircraft1);

            var controller = new AircraftsController(_mock.repo.Object, _mock.mapper);

            // Act
            var result = await controller.DeleteAircraft(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteAircraft_Returns404NotFound_WhenNonExistentResourceIDSubmitted()
        {
            // Arrange
            _mock.repo.Setup(repo => 
                repo.GetAircraftByIdAsync(0)).ReturnsAsync(() => null);

            var controller = new AircraftsController(_mock.repo.Object, _mock.mapper);

            // Act
            var result = await controller.DeleteAircraft(0);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
        #endregion
    }
}
