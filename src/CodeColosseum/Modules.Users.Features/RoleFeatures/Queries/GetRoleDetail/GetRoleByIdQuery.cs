using CodeColosseum.Shared.Application.Messaging;
using Modules.Users.Application.RoleFeatures.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.RoleFeatures.Queries.GetRoleDetail
{
    public record GetRoleByIdQuery (Guid RoleId) : IQuery<RoleResponse>;
}
