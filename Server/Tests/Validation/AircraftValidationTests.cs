using System.Threading.Tasks;
using Xunit;
using FluentValidation.TestHelper;
using Entities.DTOs.V1.Aircrafts;
using System.Linq;

namespace Tests.Validation
{
    public class AircraftValidationTests
    {
        private readonly AircraftCreateDTOValidator aircraftValidator;

        public AircraftValidationTests()
        {
            aircraftValidator = new AircraftCreateDTOValidator();
        }

        [Theory]
        [InlineData(" ")]
        [InlineData(" 152")]
        [InlineData("C15 ")]
        [InlineData("ABCDE")]
        [InlineData("12345")]
        public async Task AircraftCreate_InvalidIcaoId_ValidationShouldFail(string icaoId)
        {
            // Arrange
            var model = new AircraftCreateDTO {
                IcaoId = icaoId
            };

            // Act
            var result = await aircraftValidator.TestValidateAsync(model);

            // Assert
            result.ShouldHaveValidationErrorFor(a => a.IcaoId);
        }

        [Theory]
        [InlineData("ABC1")]
        [InlineData("BC3")]
        [InlineData("X-C3")]
        [InlineData("1234")]
        [InlineData("123A")]
        [InlineData("A1")]
        [InlineData("")]
        public async Task AircraftCreate_ValidIcaoId_ValidationShouldPass(string icaoId)
        {
            // Arrange
            var model = new AircraftCreateDTO {
                IcaoId = icaoId
            };

            // Act
            var result = await aircraftValidator.TestValidateAsync(model);

            // Assert
            result.ShouldNotHaveValidationErrorFor(a => a.IcaoId);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("  ")]
        [InlineData("Ce$$na")]
        [InlineData("C.ssna")]
        [InlineData("-")]
        [InlineData("Cessna-")]
        [InlineData("-Cessna")]
        [InlineData(" Cessna")]
        [InlineData("Boeing ")]
        public async Task AircraftCreate_InvalidManufacturer_ValidationShouldFail(string manufacturer)
        {
            // Arrange
            var model = new AircraftCreateDTO {
                Manufacturer = manufacturer
            };

            // Act
            var result = await aircraftValidator.TestValidateAsync(model);

            // Assert
            result.ShouldHaveValidationErrorFor(a => a.Manufacturer);
        }

        [Fact]
        public async Task AircraftCreate_InvalidManufacturerLength_ValidationShouldFail()
        {
            // Arrange
            var model = new AircraftCreateDTO {
                Manufacturer = Enumerable.Repeat("a", 256).ToString()
            };

            // Act
            var result = await aircraftValidator.TestValidateAsync(model);

            // Assert
            result.ShouldHaveValidationErrorFor(a => a.Manufacturer);
        }

        // TODO: valid manufacturer

        // TODO: model
    }
}