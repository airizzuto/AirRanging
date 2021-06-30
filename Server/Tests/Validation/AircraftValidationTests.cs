using System.Threading.Tasks;
using Xunit;
using FluentValidation.TestHelper;
using Entities.DTOs.V1.Aircrafts;

namespace Tests.Validation
{
    public class AircraftValidationTests
    {
        private readonly AircraftCreateDTOValidator aircraftValidator;

        public AircraftValidationTests()
        {
            aircraftValidator = new AircraftCreateDTOValidator();
        }

        // TODO: IcaoId validation
        [Theory]
        [InlineData(" ")]
        [InlineData(" ABC")]
        [InlineData("     ")]
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
            result.ShouldHaveValidationErrorFor(u => u.IcaoId);
        }

        [Theory]
        [InlineData("ABC1")]
        [InlineData("BC3")]
        [InlineData("X-C3")]
        [InlineData("1234")]
        [InlineData("123A")]
        [InlineData("A1")]
        public async Task AircraftCreate_ValidIcaoId_ValidationShouldPass(string icaoId)
        {
            // Arrange
            var model = new AircraftCreateDTO {
                IcaoId = icaoId
            };

            // Act
            var result = await aircraftValidator.TestValidateAsync(model);

            // Assert
            result.ShouldNotHaveValidationErrorFor(u => u.IcaoId);
        }

        // TODO: tests
    }
}