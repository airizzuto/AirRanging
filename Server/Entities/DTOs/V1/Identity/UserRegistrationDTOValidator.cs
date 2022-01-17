using FluentValidation;

namespace Entities.DTOs.V1.Identity
{
    public class UserRegistrationDTOValidator 
        : AbstractValidator<UserRegistrationDTO>
    {
        public UserRegistrationDTOValidator()
        {
            RuleFor(u => u.Email).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Email is required")
                .Matches(
                    @"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                ).WithMessage("Email must be a valid address");

            RuleFor(x => x.UserName).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Username is required")
                .MinimumLength(4).WithMessage("Username must contain between 4 and 30 characters")
                .MaximumLength(30).WithMessage("Username must contain between 4 and 30 characters")
                .Matches(@"^[a-zA-Z0-9_-]{4,30}$").WithMessage("Username must only contain alphanumeric characters.");
            
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password must contain at least 8 characters")
                .MaximumLength(250).WithMessage("Password must contain less than 250 characters")
                .Matches(
                    @"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,250}$"
                ).WithMessage("Password must contain at least one digit, one uppercase letter and one lowercase letter");
        }
    }
}