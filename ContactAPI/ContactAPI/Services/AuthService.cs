using ContactAPI.Data;
using ContactAPI.Model;
using ContactAPI.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ContactAPI.Services
{
    public class AuthService
    {
        public IConfiguration Configuration { get; }
        private ApplicationDbContext _db;
        public AuthService(IConfiguration configuration, ApplicationDbContext db)
        {
            Configuration = configuration;
            this._db = db;
        }
        public TokenViewModel Authorize(LoginViewModel loginVM)
        {
            var user = _db.Users.FirstOrDefault(u => u.UserName == loginVM.UserName && u.Password == loginVM.Password);

            if (user != null)
            {
                var token = new TokenViewModel()
                {
                    Access_Token = GenerateJwtTokenAsync(loginVM.UserName),
                    UserName = user.UserName,
                };
                return token;
            }
            else
            {
                var token = new TokenViewModel()
                {
                    Access_Token = "Error"
                };
                return token;
            }
        }

        private string GenerateJwtTokenAsync(string UserName)
        {
            var user = _db.Users.FirstOrDefault(u => u.UserName == UserName);
            if (user == null) return "Error";

            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Configuration.GetSection("Token")["Key"];
            var key = Encoding.ASCII.GetBytes(tokenKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.ID.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, UserName),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        public UserViewModel RegisterUser(UserViewModel user)
        {
            var newUser = new UserEntity
            {
                UserName = user.UserName,
                Email = user.Email,
                Password= user.Password,
            };

            _db.Users.Add(newUser);
            _db.SaveChanges();

            user.ID = newUser.ID; // Update the user entity with the new ID
            return user;
        }
    }
}
