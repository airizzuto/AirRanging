using System;
using System.Net.Mail;
using System.Text.RegularExpressions;
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

            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Username is required");
            
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required");
        }
    }
}