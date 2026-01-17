using CodeColosseum.Shared.Application.Messaging;
using CodeColosseum.Shared.Domain;
using Microsoft.AspNetCore.Identity;
using Modules.Users.Domain.Entities;

namespace Modules.Users.Application.RoleFeatures.Commands.DeleteRole
{
    public class DeleteRoleHandler : ICommandHandler<DeleteRoleCommand, Guid>
    {
        private readonly RoleManager<AppRole> _roleManager;

        public DeleteRoleHandler(RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
        }
        public async Task<Result<Guid>> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
        {
            try
            {
                // Find existing role by ID
                var role = await _roleManager.FindByIdAsync(request.RoleId.ToString());

                if (role == null)
                {
                    return Result.Failure<Guid>(
                        new Error("Role.NotFound", $"Role with ID {request.RoleId} was not found."),
                        "Role not found"
                    );
                }

                // Soft delete the role
                role.IsActive = !role.IsActive;
                var result = await _roleManager.UpdateAsync(role);

                if (!result.Succeeded)
                {
                    var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                    return Result.Failure<Guid>(
                        new Error("Role.DeleteFailed", errors),
                        "Unable to delete role"
                    );
                }

                return Result.Success(request.RoleId, "Delete role successfully");
            }
            catch (Exception ex)
            {
                return Result.Failure<Guid>(
                    new Error("Role.DeleteException", ex.Message),
                    "An error occurred while deleting the role"
                );
            }
        }
    }
}
