using Azure.Core;
using CodeColosseum.Shared.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modules.Users.Application.RoleFeatures.Commands.CreateRole;
using Modules.Users.Application.RoleFeatures.Commands.UpdateRole;

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

        [HttpPut("{roleId}")]
        public async Task<IActionResult> UpdateRole(Guid roleId, [FromBody] UpdateRoleCommand command)
        {
            // Đảm bảo ID trên URL khớp với ID trong Body (hoặc gán đè)
            if (roleId != command.RoleId)
            {
                return BadRequest(Result.Failure<Guid>(
                        new Error("","RoleId not matched"),"Update failed"
                    ));
            }

            var result = await _sender.Send(command);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
