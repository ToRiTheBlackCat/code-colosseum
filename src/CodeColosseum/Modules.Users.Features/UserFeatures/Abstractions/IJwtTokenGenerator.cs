using Modules.Users.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.UserFeatures.Abstractions
{
    public interface IJwtTokenGenerator
    {
        Task<(string, string)> GenerateTokensAsync(AppUser user);
        Task<(string, string)> RefreshTokenAsync(AppUser user, string refreshToken);
        Task<string> GetExpirityTimeOfRefreshToken(AppUser user);
    }
}
