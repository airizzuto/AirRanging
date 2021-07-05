using FluentValidation;

namespace Entities.DTOs.V1.Identity
{
    public class PasswordResetForgotDTOValidator 
        : AbstractValidator<PasswordResetForgotDTO>
    {
        public PasswordResetForgotDTOValidator()
        {
            RuleFor(p => p.Email).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Email is required")
                .Matches(
                    @"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                ).WithMessage("Email must be a valid address");
        }
    }
}