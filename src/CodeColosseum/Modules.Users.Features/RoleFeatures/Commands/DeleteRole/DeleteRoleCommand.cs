using CodeColosseum.Shared.Application.Messaging;

namespace Modules.Users.Application.RoleFeatures.Commands.DeleteRole
{
    public record DeleteRoleCommand(Guid RoleId) : ICommand<Guid>;
}
