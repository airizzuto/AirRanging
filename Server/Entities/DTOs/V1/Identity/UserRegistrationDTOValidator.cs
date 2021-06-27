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
                    @"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                ).WithMessage("Email must be a valid address");

            RuleFor(x => x.UserName).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Username is required")
                .Matches(@"^[a-zA-Z0-9_-]{4,16}$").WithMessage("Username must only contain alphanumeric characters.")
                .MinimumLength(4).WithMessage("Username must between 4 and 16 characters")
                .MaximumLength(16).WithMessage("Username must between 4 and 16 characters");
            
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required");
        }
    }
}