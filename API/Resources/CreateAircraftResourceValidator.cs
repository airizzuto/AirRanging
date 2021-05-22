using API.Domain.Models.Enums;
using FluentValidation;

namespace API.Resources
{
    public class CreateAircraftResourceValidator
        : AbstractValidator<CreateAircraftResource>
    {
        public CreateAircraftResourceValidator()
        {
            // TODO: better validations 
            RuleFor(x => x.Id)
                .NotNull()
                .NotEmpty().WithMessage("Id is required");
            
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
            
            RuleFor(x => x.Variant)
                .MaximumLength(255);
            
            // RuleFor(x => x.AircraftType) // FIXME
            //     .IsEnumName(typeof(EAircraftType));

            // RuleFor(x => x.EngineType) // FIXME
            //     .IsEnumName(typeof(EEngineType));

            // RuleFor(x => x.WeightCategory) // FIXME
            //     .IsEnumName(typeof(EWeightCategory));

            // RuleFor(x => x.IcaoWakeCategory) // FIXME
            //     .IsEnumName(typeof(EIcaoWakeCategory));

            // RuleFor(x => x.FuelType) // FIXME
            //     .IsEnumName(typeof(EFuelType));

            RuleFor(x => x.CruiseSpeed)
                .LessThan(300_000);

            RuleFor(x => x.FuelCapacity)
                .NotNull()
                .NotEmpty().WithMessage(
                    "Fuel capacity is required for calculations"
                    )
                .LessThan(10_000_000);

            RuleFor(x => x.MaxRange)
                .NotNull()
                .NotEmpty().WithMessage(
                    "Max Range is required for calculations"
                    )
                .LessThan(1_000_000);
            
            RuleFor(x => x.ServiceCeiling)
                .LessThan(1_000_000);
        }
    }
}