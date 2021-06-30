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
        [InlineData(" ")]
        [InlineData("a")]
        [InlineData("abcd")]
        [InlineData("1")]
        [InlineData("1234")]
        [InlineData("@")]
        [InlineData("@test")]
        [InlineData("test@")]
        [InlineData(" @test")]
        [InlineData(" test@")]
        [InlineData("@test ")]
        [InlineData("test@ ")]
        [InlineData("#.@!$.'")]
        [InlineData("1234@1234")]
        [InlineData("a@a")]
        [InlineData("1@2")]
        public async Task UserRegistration_InvalidEmail_ValidationShouldFail(string email)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                Email = email
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldHaveValidationErrorFor(u => u.Email);
        }

        [Theory]
        [InlineData("a@1234.com")]
        [InlineData("abc@1234.com")]
        [InlineData("test@test.com")]
        [InlineData("Luke.Skywalker@test.com")]
        [InlineData("luke.skywalker@test.com")]
        [InlineData("lskywalker+app@test.com")]
        public async Task UserRegistration_ValidEmail_ValidationShouldPass(string email)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                Email = email
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldNotHaveValidationErrorFor(u => u.Email);
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData("     ")]
        [InlineData("1")]
        [InlineData("123")]
        [InlineData("a")]
        [InlineData("abc")]
        [InlineData("+-....+-")]
        [InlineData("*/-+_``")]
        [InlineData("````")]
        [InlineData("` 112")]
        [InlineData("luke.skywalker")]
        public async Task UserRegistration_InvalidUsername_ValidationShouldFail(string username)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                UserName = username
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldHaveValidationErrorFor(u => u.UserName);
        }

        // TODO: more cases
        [Theory]
        [InlineData("test")]
        [InlineData("1234")]
        [InlineData("lskywalker")]
        [InlineData("luke-skywalker")]
        [InlineData("-lukeskywalker-")]
        public async Task UserRegistration_ValidUsername_ValidationShouldPass(string username)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                UserName = username
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldNotHaveValidationErrorFor(u => u.UserName);
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData("        ")]
        [InlineData("+-....+-")]
        [InlineData("*/-+_```")]
        [InlineData("``````````")]
        [InlineData("`112")]
        [InlineData("1      1")]
        [InlineData("1")]
        [InlineData("123")]
        [InlineData("12345678")]
        [InlineData("a")]
        [InlineData("abc")]
        [InlineData("abcdefgh")]
        [InlineData("ABCde*fgh")]
        [InlineData("ABCde -fgh123")]
        [InlineData("ABCDefghijk-123456789")]
        public async Task UserRegistration_InvalidPassword_ValidationShouldFail(string password)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                Password = password
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldHaveValidationErrorFor(u => u.Password);
        }

        [Theory]
        [InlineData("P4ssw0rD")]
        [InlineData("P4ss+w0rD")]
        [InlineData("Abcdefghijk123456789")]
        public async Task UserRegistration_ValidPassword_ValidationShouldPass(string password)
        {
            // Arrange
            var model = new UserRegistrationDTO {
                Password = password
            };

            // Act
            var result = await registrationValidator.TestValidateAsync(model);

            // Assert
            result.ShouldNotHaveValidationErrorFor(u => u.Password);
        }
    }
}