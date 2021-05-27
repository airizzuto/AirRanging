using API.Controllers;
using Moq;
using AutoMapper;
using Xunit;
using System.Collections.Generic;
using API.Domain.Models;
using API.Domain.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using API.Tests.Helpers;
using System.Threading.Tasks;

namespace AirRangingAPI.Tests
{
    public class AircraftsControllerTests
    {
        private MockAPI _mock = new();
        private MockAircraftsData _mockData = new();

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
    }
}
