using CodeColosseum.Shared.Application.Messaging;
using Modules.Users.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.RoleFeatures.Commands.UpdateRole
{
    public record UpdateRoleCommand(
        Guid RoleId,
        string RoleName,
        string Description
    ) : ICommand<Guid>;
}
