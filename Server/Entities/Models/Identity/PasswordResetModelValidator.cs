using FluentValidation;

namespace Entities.Models.Identity
{
    public class PasswordResetValidator : AbstractValidator<PasswordResetModel>
    {
        public PasswordResetValidator()
        {
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password must contain between 8 and 20 characters")
                .MaximumLength(20).WithMessage("Password must contain between 8 and 20 characters")
                .Matches(
                    @"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,20}$"
                ).WithMessage("Password must contain at least one digit, one uppercase letter and one lowercase letter");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password must contain between 8 and 20 characters")
                .MaximumLength(20).WithMessage("Password must contain between 8 and 20 characters")
                .Matches(
                    @"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,20}$"
                ).WithMessage("Password must contain at least one digit, one uppercase letter and one lowercase letter")
                .Matches(x => x.Password).WithMessage("The password and confirmation password do not match.");
        }
    }
}