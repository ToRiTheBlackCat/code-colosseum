using CodeColosseum.Shared.Application.Messaging;
using CodeColosseum.Shared.Domain;
using Microsoft.AspNetCore.Identity;
using Modules.Users.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.RoleFeatures.Commands.UpdateRole
{
    public class UpdateRoleHandler : ICommandHandler<UpdateRoleCommand, Guid>
    {
        private readonly RoleManager<AppRole> _roleManager;

        public UpdateRoleHandler(RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<Result<Guid>> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
        {
            // 1. Tìm Role theo ID
            var role = await _roleManager.FindByIdAsync(request.RoleId.ToString());

            if (role == null)
            {
                return Result.Failure<Guid>(
                    new Error("Role.NotFound", $"Role with ID {request.RoleId} was not found."),
                    "Role not found"
                );
            }

            // 2. Nếu người dùng đổi tên Role -> Kiểm tra xem tên mới có bị trùng với người khác không
            if (role.Name != request.RoleName)
            {
                var existingRoleName = await _roleManager.FindByNameAsync(request.RoleName);
                if (existingRoleName != null)
                {
                    return Result.Failure<Guid>(
                        new Error("Role.DuplicateName", $"Role name '{request.RoleName}' is already taken."),
                        "Update role failed"
                    );
                }
            }

            // 3. Cập nhật thông tin
            role.Name = request.RoleName;
            role.Description = request.Description;

            // 4. Lưu xuống DB
            var result = await _roleManager.UpdateAsync(role);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return Result.Failure<Guid>(
                    new Error("Role.UpdateFailed", errors),
                    "Unable to update role"
                );
            }

            return Result.Success(role.Id, "Update role successfully");
        }
    }
}
