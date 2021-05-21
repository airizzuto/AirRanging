using FluentValidation;

namespace API.Resources
{
    public class GetAircraftResourceValidator
        : AbstractValidator<GetAircraftResource>
    {
        public GetAircraftResourceValidator()
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