using FluentValidation;

namespace Entities.DTOs.V1.Identity
{
    public class UserRegistrationRequestValidator 
        : AbstractValidator<UserRegistrationDTO>
    {
        public UserRegistrationRequestValidator()
        {
            RuleFor(x => x.Email).EmailAddress();
            RuleFor(x => x.UserName).NotNull().NotEmpty();
            RuleFor(x => x.Password).NotNull().NotEmpty();
        }
    }
}