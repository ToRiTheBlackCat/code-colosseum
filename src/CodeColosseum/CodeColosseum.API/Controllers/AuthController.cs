using CodeColosseum.Shared.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modules.Users.Application.UserFeatures.Commands.Auth.Login;
using Modules.Users.Application.UserFeatures.Commands.Auth.Register;
using Modules.Users.Application.UserFeatures.Commands.Auth.VerifyOTP;

namespace CodeColosseum.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ISender _sender;

        public AuthController(ISender sender)
        {
            _sender = sender;
        }

        /// <summary>
        /// Register new app user account
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
        {
            var result = await _sender.Send(command);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Confirm resiter api
        /// </summary>
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpCommand command)
        {
            var result = await _sender.Send(command);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Login
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            var result = await _sender.Send(command);

            if (result.IsFailure)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
