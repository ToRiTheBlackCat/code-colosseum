using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Modules.Users.Domain.Entities;
using Modules.Users.Infrastructure.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.DataProtection;

namespace Modules.Users.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddUserInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDataProtection();

            services.AddDbContext<UsersDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("CodeColosseum_UsersDB_Connection")));

            // Identity Configuration 
            services.AddIdentityCore<AppUser>(options =>
            {
                // Configure User Email
                options.User.RequireUniqueEmail = true;
                // Configure Password
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
            })
                .AddRoles<AppRole>()                    
                .AddEntityFrameworkStores<UsersDbContext>() // Connect to DB
                .AddDefaultTokenProviders();
            return services;
        }
    }
}
