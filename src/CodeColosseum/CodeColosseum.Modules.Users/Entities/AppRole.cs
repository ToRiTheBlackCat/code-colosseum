using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Modules.Users.Domain.Entities
{
    public class AppRole : IdentityRole<Guid>
    {
        [MaxLength(250)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;

        public AppRole(string roleName) : base(roleName)
        {
        }

        public AppRole() : base()
        {
        }
    }
}
