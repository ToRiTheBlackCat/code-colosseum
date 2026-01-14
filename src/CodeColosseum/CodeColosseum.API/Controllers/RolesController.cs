using CodeColosseum.Shared.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Modules.Users.Application.RoleFeatures.Commands.CreateRole;
using Modules.Users.Application.RoleFeatures.Commands.DeleteRole;
using Modules.Users.Application.RoleFeatures.Commands.UpdateRole;
using Modules.Users.Application.RoleFeatures.Queries.GetListRole;
using Modules.Users.Application.RoleFeatures.Queries.GetRoleDetail;

namespace CodeColosseum.API.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly ISender _sender;

        public RolesController(ISender sender)
        {
            _sender = sender;
        }

        /// <summary>
        /// Get list of all roles
        /// </summary>
        /// <returns>List of RoleResponse</returns>
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var query = new GetListRolesQuery();
            var result = await _sender.Send(query);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        /// <summary>
        /// Get detail of role by ID
        /// </summary>
        /// <returns>Detail of Role</returns>
        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetRoleById(Guid roleId)
        {
            var query = new GetRoleByIdQuery(roleId);
            var result = await _sender.Send(query);

            if (result.IsFailure)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Create new Role
        /// </summary>
        /// <param name="command">CreateRoleCommand</param>
        /// <returns>New Guid of Created Role</returns>
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleCommand command)
        {
            var result = await _sender.Send(command);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Update existed Role
        /// </summary>
        /// <param name="roleId">Find exited Role</param>
        /// <param name="command">UpdateRoleCommand</param>
        /// <returns>Guid of Updated Role</returns>
        [HttpPut("{roleId}")]
        public async Task<IActionResult> UpdateRole(Guid roleId, [FromBody] UpdateRoleCommand command)
        {
            if (roleId != command.RoleId)
            {
                return BadRequest(Result.Failure<Guid>(
                        new Error("", "RoleId not matched"), "Update failed"
                    ));
            }

            var result = await _sender.Send(command);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Delete existed Role
        /// </summary>
        /// <param name="roleId">Find exited Role</param>
        /// <returns>Guid of Deleted Role</returns>
        [HttpDelete("{roleId}")]
        public async Task<IActionResult> DeleteRole(Guid roleId)
        {
            var command = new DeleteRoleCommand(roleId);
            var result = await _sender.Send(command);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
