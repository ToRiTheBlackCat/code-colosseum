using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Modules.Users.Application.UserFeatures.Abstractions;
using Modules.Users.Domain.Entities;
using Modules.Users.Infrastructure.Auth;
using Modules.Users.Infrastructure.Database;

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
                //Configure UserName
                options.User.AllowedUserNameCharacters = null;
            })
                .AddRoles<AppRole>()
                .AddEntityFrameworkStores<UsersDbContext>() 
                .AddDefaultTokenProviders();

            // Configure JWT
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

            return services;
        }
    }
}
