using CodeColosseum.Shared.Application.Abstractions;
using CodeColosseum.Shared.Constans.Identity;
using CodeColosseum.Shared.Constans.System;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Modules.Users.Domain.Entities;
using Modules.Users.Domain.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.UserFeatures.EventHandlers
{
    public class SendEmailConfirmationHandler : INotificationHandler<UserRegisteredDomainEvent>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;

        public SendEmailConfirmationHandler(UserManager<AppUser> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task Handle(UserRegisteredDomainEvent notification, CancellationToken cancellationToken)
        {
            // OTP code generation
            var otp = GenerateOtp(6);

            // Store OTP into DB
            await SaveOtpToDb(notification.User, otp, TimeSpan.FromMinutes(10));

            // Email sending 
            await _emailService.SendOTPRegisterAccount(notification.Email, otp);

            // Insert Role of User
            await _userManager.AddToRoleAsync(notification.User, UserRole.USER);
        }

        /// <summary>
        /// Helper method to generate a random OTP code
        /// </summary>
        /// <param name="length">Custom length of OTP</param>
        /// <returns></returns>
        private string GenerateOtp(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            using var rng = RandomNumberGenerator.Create();
            var result = new char[length];
            var buffer = new byte[sizeof(uint)];

            for (int i = 0; i < length; i++)
            {
                rng.GetBytes(buffer);
                uint num = BitConverter.ToUInt32(buffer, 0);
                result[i] = chars[(int)(num % (uint)chars.Length)];
            }

            return new string(result);
        }

        /// <summary>
        /// Store OTP in the database - UserTokens table
        /// </summary>
        private async Task SaveOtpToDb(AppUser user, string otpCode, TimeSpan expiry)
        {
            // Calculate expiry time
            var expiryTime = DateTime.UtcNow.Add(expiry);
            // Store both OTP code and expiry time in the token value
            var tokenValue = $"{otpCode};{expiryTime:O}";

            await _userManager.SetAuthenticationTokenAsync(
                 user,
                 IdentityConstants.DEFAULT,
                 SystemConstants.EMAIL_CONFIRMATION_OTP,
                 tokenValue // Sample Value: "123456;2025-01-01T12:00:00.000Z"
            );
        }
    }
}
