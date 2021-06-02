using FluentValidation;

namespace API.DTOs.V1.Registration
{
    public class UserRegistrationRequestValidator : AbstractValidator<UserRegistrationRequest>
    {
        public UserRegistrationRequestValidator()
        {
            RuleFor(x => x.Email).EmailAddress();
        }
    }
}