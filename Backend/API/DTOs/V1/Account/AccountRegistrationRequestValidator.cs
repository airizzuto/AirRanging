using FluentValidation;

namespace API.DTOs.V1.Account
{
    public class AccountRegistrationRequestValidator : AbstractValidator<AccountRegistrationRequest>
    {
        public AccountRegistrationRequestValidator()
        {
            RuleFor(x => x.Email).EmailAddress();
        }
    }
}