using System.Threading.Tasks;
using Xunit;
using FluentValidation.TestHelper;
using Entities.DTOs.V1.Identity;

namespace Tests.Validation
{
    public class AccountValidationTests
    {
        private readonly UserRegistrationDTOValidator registrationValidator;

        public AccountValidationTests()
        {
            registrationValidator = new UserRegistrationDTOValidator();
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("a")]
        [InlineData("abcd")]
        [InlineData("1")]
        [InlineData("1234")]
        [InlineData("@")]
        [InlineData("@1234")]
        [InlineData("#.@!$.'")]
        public async Task UserRegistration_InvalidEmail_ValidationShouldFail(string email)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                UserName = "test",
                Email = email,
                Password = "P4ssw0rd"
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldHaveValidationErrorFor(u => u.Email);
        }

        [Theory]
        [InlineData("1234@1234")]
        [InlineData("abc@1234.com")]
        [InlineData("a@a")]
        [InlineData("1@2")]
        [InlineData("test@test.com")]
        public async Task UserRegistration_ValidEmail_ValidationShouldPass(string email)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                UserName = "test",
                Email = email,
                Password = "P4ssw0rd"
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldNotHaveValidationErrorFor(u => u.Email);
        }
    }
}