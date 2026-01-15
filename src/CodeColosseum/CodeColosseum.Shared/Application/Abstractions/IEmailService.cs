using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeColosseum.Shared.Application.Abstractions
{
    public interface IEmailService
    {
        Task SendOTPRegisterAccount(string toEmail, string otp);
    }
}
