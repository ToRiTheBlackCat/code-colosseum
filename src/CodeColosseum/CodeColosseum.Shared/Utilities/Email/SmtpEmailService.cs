using CodeColosseum.Shared.Application.Abstractions;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeColosseum.Shared.Utilities.Email
{
    public class SmtpEmailService : IEmailService
    {
        private readonly EmailSettings _settings;

        public SmtpEmailService(IOptions<EmailSettings> settings)
        {
            _settings = settings.Value;

        }
        public async Task SendOTPRegisterAccount(string toEmail, string otp)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
            email.To.Add(new MailboxAddress(toEmail, toEmail));

            email.Subject = "🔐 CODE-COLOSSEUM | SIGNUP OTP CODE 🔐";
            string htmlBody = $@"
<html>
  <head>
    <style>
      body {{
        background: #f7f9fc;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
      }}
      .container {{
        width: 100%;
        padding: 40px 0;
        display: flex;
        justify-content: center;
      }}
      .card {{
        width: 600px;
        background: linear-gradient(135deg, #2b5876, #4e4376);
        border-radius: 12px;
        padding: 40px;
        color: white !important;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      }}
      .otp-box {{
        font-size: 28px;
        font-weight: bold;
        background-color: #ffffff;
        color: #2b5876;
        display: inline-block;
        padding: 12px 24px;
        border-radius: 8px;
        margin: 20px 0;
        letter-spacing: 4px;
        min-width: 180px;
      }}
      h2, p {{
        color: white !important;
        margin: 0 0 20px 0;
      }}
      .footer {{
        font-size: 12px;
        color: #cccccc !important;
        margin-top: 30px;
      }}
    </style>
  </head>
  <body>
    <div class='container'>
      <div class='card'>
        <h2>📧 Verify Your Email</h2>
        <p>Please use the OTP code below to complete your signup:</p>
        <div class='otp-box'>
          {otp}
        </div>
        <p>This code will expire in 15 minutes. If you did not request this, please ignore this email.</p>
        <div class='footer'>
          &copy; © 2025 COLLABSPHERE. All rights reserved.
        </div>
      </div>
    </div>
  </body>
</html>";

            //LOGO



            var builder = new BodyBuilder { HtmlBody = htmlBody };
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            try
            {
                await smtp.ConnectAsync(_settings.SmtpServer, _settings.Port, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_settings.SenderEmail, _settings.Password);
                await smtp.SendAsync(email);
            }
            finally
            {
                await smtp.DisconnectAsync(true);
            }
        }
    }
}
