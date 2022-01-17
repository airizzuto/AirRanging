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
                .MaximumLength(250)
                .Matches(@"^[a-zA-Z1-9]+[-\s\w]*[a-zA-Z1-9]$").WithMessage("Only alphanumeric and spaces allowed.");
            
            RuleFor(x => x.Model).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Model name must be provided")
                .MaximumLength(250)
                .Matches(@"^[a-zA-Z1-9]+[-\w]*[a-zA-Z1-9]$").WithMessage("Only alphanumeric characters allowed.");

            RuleFor(x => x.Variant)
                .NotEmpty().WithMessage("Model name must be provided")
                .MaximumLength(250)
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

            RuleFor(x => x.MTOW)
                .GreaterThan((uint)0)
                .LessThan(uint.MaxValue);
            
            RuleFor(x => x.MinRunwayLength)
                .GreaterThanOrEqualTo((uint)0)
                .LessThan(uint.MaxValue);

            RuleFor(x => x.CruiseSpeed)
                .LessThan(300_000); // TODO: TBD VNO Validation

            RuleFor(x => x.FuelCapacity)
                .NotEmpty().WithMessage(
                    "Fuel capacity is required for calculations"
                ).GreaterThanOrEqualTo(0)
                .LessThan(decimal.MaxValue);

            RuleFor(x => x.MaxRange)
                .NotEmpty().WithMessage(
                    "Max Range is required for calculations"
                ).GreaterThanOrEqualTo(0)
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