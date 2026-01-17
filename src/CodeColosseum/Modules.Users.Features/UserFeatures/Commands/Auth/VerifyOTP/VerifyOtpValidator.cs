using FluentValidation;
using Modules.Users.Application.UserFeatures.Commands.Auth.Register;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.VerifyOTP
{
    public class VerifyOtpValidator : AbstractValidator<VerifyOtpCommand>
    {
        public VerifyOtpValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(x => x.OtpCode)
                .NotEmpty().WithMessage("OTP is required.")
                .Length(6).WithMessage("OTP must be 6 characters long.");
        }
    }
}
