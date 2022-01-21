using FluentValidation;

namespace Entities.DTOs.V1.Landmarks
{
    public class LandmarkUpdateDTOValidator : AbstractValidator<LandmarkUpdateDTO>
    {
        public LandmarkUpdateDTOValidator()
        {
            RuleFor(l => l.Type)
                .IsInEnum();

            RuleFor(l => l.Name).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Name must be provided.")
                .MaximumLength(250)
                .WithMessage("Name must be less than 250 characters.");
            
            RuleFor(l => l.Description).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Name must be provided.")
                .MaximumLength(1000)
                .WithMessage("Description exceeding maximum characters permited (1000 characters maximum).");
            
            RuleFor(l => l.Latitude)
                .NotNull().WithMessage("Latitude is required")
                .LessThan(float.MaxValue);

            RuleFor(l => l.Longitude)
                .NotNull().WithMessage("Longitude is required")
                .LessThan(float.MaxValue);
            
            RuleFor(l => l.Altitude)
                .LessThan(float.MaxValue);
        }
    }
}