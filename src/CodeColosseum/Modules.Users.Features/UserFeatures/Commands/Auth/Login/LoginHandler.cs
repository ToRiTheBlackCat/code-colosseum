using CodeColosseum.Shared.Application.Messaging;
using CodeColosseum.Shared.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Modules.Users.Application.UserFeatures.Abstractions;
using Modules.Users.Application.UserFeatures.Commands.Auth.DTOs;
using Modules.Users.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.Login
{
    public class LoginHandler : ICommandHandler<LoginCommand, LoginResponseDto>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configure;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public LoginHandler(UserManager<AppUser> userManager,
                            IConfiguration configure,
                            IJwtTokenGenerator jwtTokenGenerator)
        {
            _userManager = userManager;
            _configure = configure;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<Result<LoginResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            try
            {
                // Find user with email
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return Result.Failure<LoginResponseDto>(new Error("Auth.LoginFailed", "Invalid email or password"));
                }

                // Create password need to check
                var passwordToCheck = request.Password + _configure["SecretString"];

                // Check password
                var isPasswordValid = await _userManager.CheckPasswordAsync(user, passwordToCheck);
                if (!isPasswordValid)
                {
                    return Result.Failure<LoginResponseDto>(new Error("Auth.LoginFailed", "Invalid email or password"));
                }

                // Check if email confirmed
                if (!user.EmailConfirmed)
                {
                    return Result.Failure<LoginResponseDto>(new Error("Auth.NotVerified", "Please verify your email via OTP first."));
                }

                // Check if user active
                if (!user.IsActive)
                {
                    return Result.Failure<LoginResponseDto>(new Error("Auth.Locked", "Account is locked."));
                }

                // Generate both tokens
                var (accessToken, refreshToken) = await _jwtTokenGenerator.GenerateTokensAsync(user);

                // Get found user role
                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault() ?? "User";
                var expiryString = await _jwtTokenGenerator.GetExpirityTimeOfRefreshToken(user);

                // Map to response DTO
                var response = new LoginResponseDto
                {
                    UserId = user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    RefreshTokenExpiryTime = expiryString,
                    AvatarUrl = user.AvatarUrl,
                    PhoneNumber = user.PhoneNumber,
                    Role = role
                };

                return Result.Success(response);
            }
            catch (Exception ex)
            {
                return Result.Failure<LoginResponseDto>(new Error("Auth.LoginException", $"An error occurred while confirming otp code. Exception detail: {ex.Message}"));
            }
        }
    }
}
