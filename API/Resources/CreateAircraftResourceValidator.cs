using FluentValidation;

namespace API.Resources
{
    public class CreateAircraftResourceValidator
        : AbstractValidator<CreateAircraftResource>
    {
        public CreateAircraftResourceValidator()
        {
            // TODO: validations
            RuleFor(x => x.Id)
                .NotNull()
                .NotEmpty().WithMessage("Id is required");
            
            RuleFor(x => x.IcaoId)
                .MaximumLength(4);

            RuleFor(x => x.FuelCapacity)
                .NotNull()
                .NotEmpty().WithMessage(
                    "Fuel capacity is required for calculations"
                );

            RuleFor(x => x.MaxRange)
                .NotNull()
                .NotEmpty().WithMessage(
                    "Max Range is required for calculations"
                );
        }
    }
}