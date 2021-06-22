using FluentValidation;

namespace Entities.DTOs.V1.Identity
{
    public class UserRegistrationRequestValidator 
        : AbstractValidator<UserRegistrationDTO>
    {
        public UserRegistrationRequestValidator()
        {
            RuleFor(x => x.Email).EmailAddress();
        }
    }
}