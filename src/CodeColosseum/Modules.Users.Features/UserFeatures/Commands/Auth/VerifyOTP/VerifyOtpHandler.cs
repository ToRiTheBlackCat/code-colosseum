using CodeColosseum.Shared.Application.Messaging;
using CodeColosseum.Shared.Constans.Identity;
using CodeColosseum.Shared.Constans.System;
using CodeColosseum.Shared.Domain;
using Microsoft.AspNetCore.Identity;
using Modules.Users.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.VerifyOTP
{
    public class VerifyOtpHandler : ICommandHandler<VerifyOtpCommand, string>
    {
        private readonly UserManager<AppUser> _userManager;

        public VerifyOtpHandler(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Result<string>> Handle(VerifyOtpCommand request, CancellationToken cancellationToken)
        {
            try
            {
                //Find existing user by email
                var foundUser = await _userManager.FindByEmailAsync(request.Email);
                if (foundUser == null)
                {
                    return Result.Failure<string>(
                        new Error("Auth.UserNotFound",
                        "User not found")
                    );
                }

                //Check if email is already confirmed
                if (foundUser.EmailConfirmed)
                {
                    return Result.Failure<string>(
                        new Error("Auth.EmailAlreadyConfirmed",
                        "Email is already confirmed")
                    );
                }

                //Retrieve the OTP token from DB
                var tokenValue = await _userManager.GetAuthenticationTokenAsync(
                    foundUser,
                    IdentityConstants.DEFAULT,
                    SystemConstants.EMAIL_CONFIRMATION_OTP);

                if (string.IsNullOrEmpty(tokenValue))
                {
                    return Result.Failure<string>(
                        new Error("Auth.InvalidOtp",
                        "Invalid or expired OTP"));
                }

                // Split found token to check
                var parts = tokenValue.Split(';');
                if (parts.Length != 2)
                {
                    return Result.Failure<string>(
                        new Error("Auth.InvalidTokenFormat",
                        "Token format is invalid"));
                }

                var dbOtp = parts[0];
                var expiryString = parts[1];

                // If not matched OTP code
                if (dbOtp != request.OtpCode)
                {
                    return Result.Failure<string>(
                        new Error("Auth.WrongOtp",
                        "Incorrect OTP code"));
                }

                // Check time expirity of OTP
                if (DateTime.TryParse(expiryString, out var expiryTime))
                {
                    if (DateTime.UtcNow > expiryTime)
                    {
                        return Result.Failure<string>(
                            new Error("Auth.OtpExpired",
                            "OTP code has expired"));
                    }
                }

                // Activate user 
                foundUser.EmailConfirmed = true;
                await _userManager.UpdateAsync(foundUser);

                // Clean OTP code in DB
                await _userManager.RemoveAuthenticationTokenAsync(
                    foundUser,
                    IdentityConstants.DEFAULT,
                    SystemConstants.EMAIL_CONFIRMATION_OTP);

                return Result.Success<string>("Register successful.");
            }
            catch (Exception ex)
            {
                return Result.Failure<string>(
                    new Error("Auth.OtpException", ex.Message),
                    $"An error occurred while confirming otp code");
            }
        }
    }
}
