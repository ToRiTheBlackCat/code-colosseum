using CodeColosseum.Shared.Application.Abstractions;
using CodeColosseum.Shared.Utilities.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeColosseum.Shared
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddSharedInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure Email Settings from appsettings.json
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));

            // Register Email Service
            services.AddTransient<IEmailService, SmtpEmailService>();

            return services;
        }
    }
}
