using Entities.Models.Enums;
using FluentValidation;

namespace Entities.DTOs.V1.Aircrafts
{
    public class AircraftUpdateDTOValidator : AbstractValidator<AircraftUpdateDTO>
    {
        public AircraftUpdateDTOValidator()
        {
            RuleFor(x => x.IcaoId)
                .MaximumLength(4).WithMessage("Maximum length of ICAO code is 4");

            RuleFor(x => x.Manufacturer)
                .NotEmpty().WithMessage("Manufacturer must be provided")
                .MaximumLength(255);
            
            RuleFor(x => x.Model)
                .NotEmpty().WithMessage("Model name must be provided")
                .MaximumLength(255);
            
            RuleFor(x => x.AircraftType)
                .IsInEnum();
            
            RuleFor(x => x.EngineType)
                .IsInEnum();

            RuleFor(x => x.WeightCategory)
                .IsInEnum();
            
            RuleFor(x => x.IcaoWakeCategory)
                .IsInEnum();

            RuleFor(x => x.EngineCount)
                .NotEmpty().WithMessage("Aircraft must have an engine")
                .GreaterThanOrEqualTo((short) 1)
                .LessThan(short.MaxValue);
            
            RuleFor(x => x.FuelType)
                .Equal(EFuelType.Electric).When(x => x.EngineType == EEngineType.Electric);
            
            RuleFor(x => x.MaxTakeoffWeight)
                .GreaterThan(0)
                .LessThan(int.MaxValue);
            
            RuleFor(x => x.Variant)
                .MaximumLength(255);

            RuleFor(x => x.CruiseSpeed)
                .LessThan(300_000); // TODO: TBD VNO Validation

            RuleFor(x => x.FuelCapacity)
                .NotEmpty().WithMessage(
                    "Fuel capacity is required for calculations"
                    )
                .GreaterThanOrEqualTo(0)
                .LessThan(decimal.MaxValue);

            RuleFor(x => x.MaxTakeoffWeight)
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(int.MaxValue);

            RuleFor(x => x.MaxRange)
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
