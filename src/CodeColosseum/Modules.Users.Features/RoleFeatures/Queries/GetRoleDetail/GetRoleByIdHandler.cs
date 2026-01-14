using CodeColosseum.Shared.Application.Messaging;
using CodeColosseum.Shared.Domain;
using Microsoft.AspNetCore.Identity;
using Modules.Users.Application.RoleFeatures.DTOs;
using Modules.Users.Domain.Entities;

namespace Modules.Users.Application.RoleFeatures.Queries.GetRoleDetail
{
    public class GetRoleByIdHandler : IQueryHandler<GetRoleByIdQuery, RoleResponse>
    {
        private readonly RoleManager<AppRole> _roleManager;

        public GetRoleByIdHandler(RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<Result<RoleResponse>> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                // Find existing role by ID
                var role = await _roleManager.FindByIdAsync(request.RoleId.ToString());

                // Not found any role
                if (role == null)
                {
                    return Result.Failure<RoleResponse>(
                        new Error("Role.NotFound", $"Role with ID {request.RoleId} was not found."),
                        "Role not found"
                    );
                }

                // Map Entity sang DTO
                var response = new RoleResponse(
                    role.Id,
                    role.Name!,
                    role.Description!,
                    role.IsActive
                );

                return Result.Success(response);
            }
            catch (Exception ex)
            {
                return Result.Failure<RoleResponse>(
                    new Error("Role.DetailError", "An error occurred while retrieving the role details."),
                    ex.Message);
            }
        }
    }
}
