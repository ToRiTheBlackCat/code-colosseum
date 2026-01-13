
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Modules.Users.Domain.Entities
{
    public class AppUser : IdentityUser<Guid>
    {
        [MaxLength(100)]
        public override string? UserName { get; set; }
        public string? AvatarUrl { get; set; }
        public bool IsActive { get; set; } = true;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
    }
}
