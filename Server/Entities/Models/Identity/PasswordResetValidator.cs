using FluentValidation;

namespace Entities.Models.Identity
{
    public class PasswordResetValidator : AbstractValidator<PasswordReset>
    {
        public PasswordResetValidator()
        {
            RuleFor(x => x.Password)
                .NotEmpty();

            RuleFor(x => x.ConfirmPassword)
                .Matches(x => x.Password)
                .WithMessage("The password and confirmation password do not match.");
        }
    }
}