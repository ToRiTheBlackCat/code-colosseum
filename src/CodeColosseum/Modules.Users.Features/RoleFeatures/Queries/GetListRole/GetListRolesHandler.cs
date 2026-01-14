using CodeColosseum.Shared.Application.Messaging;
using CodeColosseum.Shared.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Modules.Users.Application.RoleFeatures.DTOs;
using Modules.Users.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.RoleFeatures.Queries.GetListRole
{
    public class GetListRolesHandler : IQueryHandler<GetListRolesQuery, List<RoleResponse>>
    {
        private readonly RoleManager<AppRole> _roleManager;

        public GetListRolesHandler(RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<Result<List<RoleResponse>>> Handle(GetListRolesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var roles = await _roleManager.Roles
                .AsNoTracking()
                .Select(role => new RoleResponse(
                    role.Id,
                    role.Name!,
                    role.Description!,
                    role.IsActive))
                .ToListAsync(cancellationToken);

                return Result.Success(roles);
            }
            catch (Exception ex)
            {
                return Result.Failure<List<RoleResponse>>(
                    new Error("Role.ListError", "An error occurred while retrieving the roles."),
                    ex.Message);
            }
        }
    }
}
