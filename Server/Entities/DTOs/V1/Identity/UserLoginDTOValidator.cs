using FluentValidation;

namespace Entities.DTOs.V1.Identity
{
    public class UserLoginDTOValidator 
        : AbstractValidator<UserLoginDTO>
    {
        public UserLoginDTOValidator()
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