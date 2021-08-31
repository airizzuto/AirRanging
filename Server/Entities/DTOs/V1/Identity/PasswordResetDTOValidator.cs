using FluentValidation;

namespace Entities.DTOs.V1.Identity
{
    public class PasswordResetDTOValidator : AbstractValidator<PasswordResetDTO>
    {
        public PasswordResetDTOValidator()
        {
            RuleFor(p => p.Email).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Email is required")
                .Matches(
                    @"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                ).WithMessage("Email must be a valid address");

            RuleFor(x => x.Password).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password must contain between 8 and 20 characters")
                .MaximumLength(20).WithMessage("Password must contain between 8 and 20 characters")
                .Matches(
                    @"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,20}$"
                ).WithMessage("Password must contain at least one digit, one uppercase letter and one lowercase letter");
        }
    }
}