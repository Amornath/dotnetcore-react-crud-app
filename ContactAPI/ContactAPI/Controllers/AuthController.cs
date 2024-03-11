using ContactAPI.Services;
using ContactAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContactAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthService _auth;
        public AuthController(AuthService auth)
        {
            this._auth = auth;
        }

        [HttpPost]
        [Route("Login")]
        public  ActionResult<TokenViewModel> Login(LoginViewModel loginVM)
        {
            var result = _auth.Authorize(loginVM);
            return Ok(result);
        }

        [HttpPost]
        [Route("Register")]
        public ActionResult<UserViewModel> Register(UserViewModel userVM)
        {
            var result = _auth.RegisterUser(userVM);
            return Ok(result);
        }
    }
}
