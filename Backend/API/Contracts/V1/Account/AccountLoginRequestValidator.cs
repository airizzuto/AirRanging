using FluentValidation;

namespace API.Contracts.V1.Account
{
    public class AccountLoginRequestValidator : AbstractValidator<AccountLoginRequest>
    {
        public AccountLoginRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty();
            
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty();
        }
    }
}