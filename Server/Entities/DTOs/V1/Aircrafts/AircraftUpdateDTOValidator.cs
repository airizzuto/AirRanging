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

            RuleFor(x => x.Variant)
                .NotEmpty().WithMessage("Model name must be provided")
                .MaximumLength(255)
                .Matches(@"^[a-zA-Z1-9]+[-\w]*[a-zA-Z1-9]$").WithMessage("Only alphanumeric characters allowed.");
            
            RuleFor(x => x.AircraftType)
                .IsInEnum()
                .NotEqual(EAircraftType.SingleEngineLand).When(
                    x => x.EngineCount > 1).WithMessage("Aircraft with more than one engine can not be of type Single Engine Land")
                .NotEqual(EAircraftType.SingleEngineSea).When(
                    x => x.EngineCount > 1).WithMessage("Aircraft with more than one engine can not be of type Single Engine Sea");
            
            RuleFor(x => x.EngineType)
                .IsInEnum();

            RuleFor(x => x.WeightCategory)
                .IsInEnum();
            
            RuleFor(x => x.IcaoWakeCategory)
                .IsInEnum();

             RuleFor(x => x.EngineCount)
                .NotEmpty().WithMessage("Aircraft must have an engine")
                .GreaterThan((ushort)0).WithMessage("Aircraft must have an engine")
                .LessThan(ushort.MaxValue);
            
            RuleFor(x => x.FuelType)
                .Equal(EFuelType.Electric).When(x => x.EngineType == EEngineType.Electric);

            RuleFor(x => x.CruiseSpeed)
                .LessThan(300_000); // TODO: TBD VNO Validation

            RuleFor(x => x.FuelCapacity)
                .NotEmpty().WithMessage(
                    "Fuel capacity is required for calculations"
                    )
                .GreaterThanOrEqualTo(0)
                .LessThan(decimal.MaxValue);

            RuleFor(x => x.MTOW)
                .GreaterThan((uint)0)
                .LessThan(uint.MaxValue);
            
            RuleFor(x => x.MinRunwayLength)
                .GreaterThanOrEqualTo((uint)0)
                .LessThan(uint.MaxValue);

            RuleFor(x => x.MaxRange)
                .NotEmpty().WithMessage(
                    "Max Range is required for calculations"
                    )
                .GreaterThanOrEqualTo(0)
                .LessThan(1_000_000); // TODO: TBD MaxRange Validation
            
            RuleFor(x => x.ServiceCeiling)
                .GreaterThanOrEqualTo((uint)0) // TODO: TBD Max Ceiling Validation
                .LessThan((uint)1_000_000); // TODO: TBD Max Ceiling Validation

            RuleFor(x => x.EnteredServiceAtYear)
                .GreaterThan(int.MinValue)
                .LessThan(int.MaxValue);
        }
    }
}
