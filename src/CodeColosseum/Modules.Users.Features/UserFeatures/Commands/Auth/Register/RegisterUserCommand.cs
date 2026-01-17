using CodeColosseum.Shared.Application.Messaging;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.Register
{
    public record RegisterUserCommand(
        string Email,
        string Password,
        string ConfirmPassword,
        string UserName
        ) : ICommand<Guid>;
}
