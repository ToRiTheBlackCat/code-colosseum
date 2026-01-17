using CodeColosseum.Shared.Application.Messaging;
using CodeColosseum.Shared.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Modules.Users.Domain.Entities;
using Modules.Users.Domain.Events;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.Register
{
    public class RegisterUserHandler : ICommandHandler<RegisterUserCommand, Guid>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IPublisher _publisher;
        private readonly IConfiguration _configure;

        public RegisterUserHandler(UserManager<AppUser> userManager,
                                   IPublisher publisher,
                                   IConfiguration configure)
        {
            _userManager = userManager;
            _publisher = publisher;
            _configure = configure;
        }

        public async Task<Result<Guid>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                //Find existing user by email
                var existingUser = await _userManager.FindByEmailAsync(request.Email);
                if (existingUser != null)
                {
                    return Result.Failure<Guid>(new Error("Auth.EmailExists", "Email already in use."));
                }

                var newUser = new AppUser
                {
                    Id = Guid.NewGuid(),
                    UserName = request.UserName.Trim(),
                    Email = request.Email.Trim(),
                    EmailConfirmed = false,
                    CreatedDate = DateTime.UtcNow,
                    IsActive = true,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                // Combine password with secret string from configuration
                var userPassword = request.Password + _configure["SecretString"];

                // Create the user
                var result = await _userManager.CreateAsync(newUser, userPassword); 

                if (!result.Succeeded)
                {
                    var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                    return Result.Failure<Guid>(new Error("Auth.RegisterFailed", errors));
                }

                // Publish domain event for user registration
                await _publisher.Publish(new UserRegisteredDomainEvent(
                    newUser,
                    newUser.Id,
                    newUser.Email,
                    newUser.UserName!
                ), cancellationToken);

                // Return success with new user ID
                return Result.Success(newUser.Id, "Register successful.");
            }
            catch (Exception ex)
            {
                return Result.Failure<Guid>(
                    new Error("Auth.RegisterUserException", ex.Message),
                    "An error occurred while register new user account"
                );
            }
        }
    }
}