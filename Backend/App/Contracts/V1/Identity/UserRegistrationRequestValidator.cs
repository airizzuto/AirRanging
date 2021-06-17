using FluentValidation;

namespace App.Contracts.V1.Identity
{
    public class UserRegistrationRequestValidator : AbstractValidator<UserRegistrationRequest>
    {
        public UserRegistrationRequestValidator()
        {
            RuleFor(x => x.Email).EmailAddress();
        }
    }
}