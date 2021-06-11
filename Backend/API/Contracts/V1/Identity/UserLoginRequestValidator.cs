using FluentValidation;

namespace API.Contracts.V1.Identity
{
    public class UserLoginRequestValidator : AbstractValidator<UserLoginRequest>
    {
        public UserLoginRequestValidator()
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