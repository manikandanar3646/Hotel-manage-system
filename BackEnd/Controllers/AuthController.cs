using hotel_management_system.data;
using hotel_management_system.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hotel_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public AuthController(HotelDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.Email == login.Email &&
                x.PasswordHash == login.Password);

            if (user == null)
            {
                return Unauthorized("Invalid Email or Password");
            }

           return Ok(new
           {
             userId = user.UserId,
             fullname = user.Fullname,
             role = user.Role,
             message = "Login Successful"
           });
        }
    }
}