using CodeColosseum.Shared.Constans.System;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Modules.Users.Application.UserFeatures.Abstractions;
using Modules.Users.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Modules.Users.Infrastructure.Auth
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly IConfiguration _configure;
        private readonly UserManager<AppUser> _userManager;
        private readonly int _accessTokenLifeTime = 180;
        private readonly int _refreshTokenLifeTime = 7;

        public JwtTokenGenerator(IConfiguration configure, UserManager<AppUser> userManager)
        {
            _configure = configure;
            _userManager = userManager;
        }

        /// <summary>
        /// Generate both token 
        /// </summary>
        /// <returns>access/refresh tokens</returns>
        public async Task<(string, string)> GenerateTokensAsync(AppUser user)
        {
            //Clear existed cache that stored refresh token of that user
            await RemoveRefreshToken(user);

            //Create both token
            var accessToken = await GenerateAccessToken(user);
            var refreshToken = GenerateRefreshToken();

            //Store in DB
            await StoreRefreshToken(user, refreshToken);

            return (accessToken, refreshToken);
        }

        /// <summary>
        /// Helping function to generate access token
        /// </summary>
        /// <returns>Access Token</returns>
        private async Task<string> GenerateAccessToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Token ID
                new Claim("UserName", user.UserName!),
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            //Get key
            var jwtKey = _configure["Jwt:Secret"];
            //Encoding key
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey ?? ""));
            //Create credential
            var credential = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            //Create token
            var token = new JwtSecurityToken(
                issuer: _configure["Jwt:Issuer"],
                audience: _configure["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_accessTokenLifeTime), // 3 hours
                signingCredentials: credential
                );

            //Signing token
            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

            return accessToken;
        }

        /// <summary>
        /// Helping function to generate refesh token
        /// </summary>
        /// <returns>Refresh Token</returns>
        private string GenerateRefreshToken()
        {
            var bytes = new byte[32];

            //Generate random number
            using var randomNum = RandomNumberGenerator.Create();
            randomNum.GetBytes(bytes);

            //Convert to string
            return Convert.ToBase64String(bytes);
        }

        /// <summary>
        /// Refresh both tokens
        /// </summary>
        /// <returns>access/refresh tokens</returns>
        public Task<(string, string)> RefreshTokenAsync(AppUser user, string refreshToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Helping function to remove recent refresh token
        /// </summary>
        private async Task RemoveRefreshToken(AppUser user)
        {
            //Retrieve the OTP token from DB
            var refreshToken = await _userManager.GetAuthenticationTokenAsync(
                user,
                SystemConstants.JWT_TOKEN,
                SystemConstants.JWT_REFRESH_TOKEN
            );

            if (refreshToken != null)
            {
                var parts = refreshToken.Split(';');

                var recentToken = parts[0];
                var expiryString = parts[1];

                if (DateTime.TryParse(expiryString, out var expiryTime))
                {
                    // If refresh token not expired
                    if (DateTime.UtcNow < expiryTime)
                    {
                        //Remove recent token
                        await _userManager.RemoveAuthenticationTokenAsync(
                           user,
                           SystemConstants.JWT_TOKEN,
                           SystemConstants.JWT_REFRESH_TOKEN
                        );
                    }
                }
            }
        }

        /// <summary>
        /// Helping function to get expired time of refresh token
        /// </summary>
        public async Task<string> GetExpirityTimeOfRefreshToken(AppUser user)
        {
            var expiryString = string.Empty;

            //Retrieve the OTP token from DB
            var refreshToken = await _userManager.GetAuthenticationTokenAsync(
                user,
                SystemConstants.JWT_TOKEN,
                SystemConstants.JWT_REFRESH_TOKEN
            );

            if (refreshToken != null)
            {
                var parts = refreshToken.Split(';');

                var recentToken = parts[0];
                expiryString = parts[1];
            }

            return expiryString;
        }

        /// <summary>
        /// Helping function to store refresh token into DB
        /// </summary>
        /// <param name="user"></param>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        private async Task StoreRefreshToken(AppUser user, string refreshToken)
        {
            // Calculate expiry time
            var expiryTime = DateTime.UtcNow.AddDays(_refreshTokenLifeTime);

            // Store both refreshToken and expiry time in DB
            var tokenValue = $"{refreshToken};{expiryTime:O}";

            await _userManager.SetAuthenticationTokenAsync(
                 user,
                 SystemConstants.JWT_TOKEN,
                 SystemConstants.JWT_REFRESH_TOKEN,
                 tokenValue
            );
        }
    }
}
