using Entities.Models.Enums;
using FluentValidation;

namespace Entities.DTOs.V1.Aircrafts
{
    public class AircraftCreateDTOValidator : AbstractValidator<AircraftCreateDTO>
    {
        public AircraftCreateDTOValidator()
        {
            RuleFor(x => x.IcaoId).Cascade(CascadeMode.Stop)
                .MaximumLength(4).WithMessage("Maximum length of ICAO code is 4")
                .Matches(@"(?!\s)+^([A-Za-z1-9-]{0,4})$").WithMessage("Only alphanumeric values and - are valid. No spaces allowed.");

            RuleFor(x => x.Manufacturer).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Manufacturer must be provided")
                .MaximumLength(255)
                .Matches(@"^[a-zA-Z1-9]+[-\s\w]*[a-zA-Z1-9]$").WithMessage("Only alphanumeric and spaces allowed.");
            
            RuleFor(x => x.Model).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Model name must be provided")
                .MaximumLength(255)
                .Matches(@"^[a-zA-Z1-9]+[-\w]*[a-zA-Z1-9]$").WithMessage("Only alphanumeric characters allowed.");

            // TODO: Link EngineCount requirement to single or multi engine AircraftType. Ex: SingleEngineLand must have only one engine.
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

            // TODO: Link EngineCount requirement to single or multi engine AircraftType. Ex: SingleEngineLand must have only one engine.
            RuleFor(x => x.EngineCount)
                .NotEmpty().WithMessage("Aircraft must have an engine")
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