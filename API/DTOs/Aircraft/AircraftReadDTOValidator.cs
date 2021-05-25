using FluentValidation;

namespace API.DTOs.Aircraft
{
    public class AircraftReadDTOValidator
        : AbstractValidator<AircraftReadDTO>
    {
        public AircraftReadDTOValidator()
        {
            RuleFor(x => x.Id)
                .NotNull()
                .NotEmpty().WithMessage("Aircraft Id is required.");

            RuleFor(x => x.IcaoId)
                .NotNull()
                .NotEmpty().WithMessage("Icao Id is required");

            // TODO: validations
        }
    }
}