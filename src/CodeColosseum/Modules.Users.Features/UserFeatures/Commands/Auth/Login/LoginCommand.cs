using CodeColosseum.Shared.Application.Messaging;
using Modules.Users.Application.UserFeatures.Commands.Auth.DTOs;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.Login
{
    public record LoginCommand(
        string Email,
        string Password
    ) : ICommand<LoginResponseDto>;
}
