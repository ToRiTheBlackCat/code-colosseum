using CodeColosseum.Shared.Application.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Application.UserFeatures.Commands.Auth.VerifyOTP
{
    public record VerifyOtpCommand(string Email, string OtpCode) : ICommand<string>;
}
