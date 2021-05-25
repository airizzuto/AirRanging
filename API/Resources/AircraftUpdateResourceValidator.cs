using FluentValidation;

namespace API.Resources
{
    public class AircraftUpdateResourceValidator
        : AbstractValidator<AircraftUpdateResource>
    {
        public AircraftUpdateResourceValidator()
        {
            // TODO: better validations
            
            RuleFor(x => x.IcaoId)
                .NotNull()
                .NotEmpty().WithMessage("ICAO Id is required")
                .MaximumLength(4).WithMessage("Maximum length of id is 4");

            RuleFor(x => x.Manufacturer)
                .NotNull()
                .NotEmpty().WithMessage("Manufacturer must be provided")
                .MaximumLength(255);
            
            RuleFor(x => x.Model)
                .NotNull()
                .NotEmpty().WithMessage("Model must be provided")
                .MaximumLength(255);

            RuleFor(x => x.EngineCount)
                .NotNull()
                .NotEmpty().WithMessage("Aircraft must have an engine")
                .GreaterThanOrEqualTo((short) 1)
                .LessThan(short.MaxValue);
            
            RuleFor(x => x.Variant)
                .MaximumLength(255);

            RuleFor(x => x.CruiseSpeed)
                .LessThan(300_000); // TODO: TBD VNO Validation

            RuleFor(x => x.FuelCapacity)
                .NotNull()
                .NotEmpty().WithMessage(
                    "Fuel capacity is required for calculations"
                    )
                .GreaterThanOrEqualTo(0)
                .LessThan(decimal.MaxValue);

            RuleFor(x => x.MaxRange)
                .NotNull()
                .NotEmpty().WithMessage(
                    "Max Range is required for calculations"
                    )
                .GreaterThanOrEqualTo(0)
                .LessThan(1_000_000); // TODO: TBD MaxRange Validation
            
            RuleFor(x => x.ServiceCeiling)
                .GreaterThanOrEqualTo(-2000) // TODO: TBD Max Ceiling Validation
                .LessThan(1_000_000); // TODO: TBD Max Ceiling Validation
        }
    }
}