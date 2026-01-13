using CodeColosseum.Shared.Application.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.RoleFeatures.Commands.CreateRole
{
    public record CreateRoleCommand(
        string RoleName,
        string Description
    ) : ICommand<Guid>;
}
