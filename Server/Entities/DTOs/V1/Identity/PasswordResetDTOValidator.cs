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
                .MinimumLength(8).WithMessage("Password must contain at least 8 characters")
                .MaximumLength(250).WithMessage("Password must contain less than 250 characters")
                .Matches(
                    @"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,250}$"
                ).WithMessage("Password must contain at least one digit, one uppercase letter and one lowercase letter");
        }
    }
}