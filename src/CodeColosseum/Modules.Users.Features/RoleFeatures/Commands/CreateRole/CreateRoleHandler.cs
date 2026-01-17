using CodeColosseum.Shared.Application.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeColosseum.Shared.Domain;
using Microsoft.AspNetCore.Identity;
using Modules.Users.Domain.Entities;

namespace Modules.Users.Application.RoleFeatures.Commands.CreateRole
{
    public class CreateRoleHandler : ICommandHandler<CreateRoleCommand, Guid>
    {
        private readonly RoleManager<AppRole> _roleManager;
        public CreateRoleHandler(RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<Result<Guid>> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var existingRole = await _roleManager.FindByNameAsync(request.RoleName);
                if (existingRole != null)
                {
                    return Result.Failure<Guid>(
                        new Error("Role.Exists", $"Role '{request.RoleName}' already exists."),
                        "Unable to create role"
                    );
                }

                var newRole = new AppRole(request.RoleName)
                {
                    Description = request.Description,
                    IsActive = true
                };

                var result = await _roleManager.CreateAsync(newRole);

                if (!result.Succeeded)
                {
                    var errors = string.Join(", ", result.Errors.Select(e => e.Description));

                    return Result.Failure<Guid>(
                        new Error("Role.CreateFailed", errors),
                        "Unable to create role"
                    );
                }

                return Result.Success(newRole.Id, "Create role successfully");
            }
            catch (Exception ex)
            {
                return Result.Failure<Guid>(
                    new Error("Role.CreateException", ex.Message),
                    "An error occurred while creating the role"
                );
            }
           
        }
    }
}
