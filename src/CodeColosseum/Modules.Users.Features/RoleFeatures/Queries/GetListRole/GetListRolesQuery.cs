using CodeColosseum.Shared.Application.Messaging;
using Modules.Users.Application.RoleFeatures.DTOs;

namespace Modules.Users.Application.RoleFeatures.Queries.GetListRole
{
    public record GetListRolesQuery() : IQuery<List<RoleResponse>>;
}
