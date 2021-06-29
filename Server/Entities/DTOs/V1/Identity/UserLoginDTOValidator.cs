using FluentValidation;

namespace Entities.DTOs.V1.Identity
{
    public class UserLoginDTOValidator 
        : AbstractValidator<UserLoginDTO>
    {
        public UserLoginDTOValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .Matches(
                    @"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                );
            
            RuleFor(x => x.Password)
                .NotEmpty()
                .Matches(@"^[a-zA-Z0-9_-]{4,16}$");
        }
    }
}