using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.DTOs
{
    public class LoginResponseDto
    {
        public Guid UserId { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public string? RefreshTokenExpiryTime { get; set; }
        public string? AvatarUrl { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
    }
}
