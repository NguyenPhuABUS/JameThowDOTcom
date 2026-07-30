using JamesThewDOTcom.Helpers;
using JamesThewDOTcom.Models;
using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace JamesThewDOTcom.Controllers;

[Route("api/account")]
public class AccountController : Controller
{
    private AccountService accountService;
    private RoleService roleService;
    private IWebHostEnvironment webHostEnvironment;

    public AccountController(AccountService accountService, RoleService roleService, IWebHostEnvironment webHostEnvironment)
    {
        this.accountService = accountService;
        this.roleService = roleService;
        this.webHostEnvironment = webHostEnvironment;
    }

    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("create")]
    public IActionResult Create([FromBody] User user, IFormFile file)
    {
        try
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            if (file != null)
            {
                /*Upload File */
                var fileName = FileHelper.generateFileName(file.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                user.AvatarUrl = fileName;
            }
            else
            {
                user.AvatarUrl = "no-image.gif";
            }
            //var roles = new List<Role>();
            //if (user.Roles != null && user.Roles.Count > 0)
            //{
            //    foreach (var role in user.Roles)
            //    {
            //        roles.Add(roleService.find(role.RoleId));
            //    }
            //    user.Roles.Clear();
            //    user.Roles = roles;
            //}
            if (user.Roles != null && user.Roles.Count == 1)
            {
                var role = roleService.find(user.Roles.First().RoleId);
                user.Roles.Clear();
                user.Roles.Add(role);
            }
            else
            {
                var defaultRole = roleService.findByname("User"); 
                user.Roles.Clear();
                user.Roles.Add(defaultRole);
            }
            return Ok(new
            {
                Result = accountService.create(user)
            });
        }
        catch
        { return BadRequest(); }
    }
    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("login")]
    public IActionResult Login([FromBody] User user)
    {
        try
        {
            return Ok(new
            {
                Result = accountService.login(user.Username, user.Password)
            });
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findByUsername/{username}")]
    public IActionResult FindByUsername(string username)
    {
        try
        {
            return Ok(accountService.findByUsername(username));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("find/{userId}")]
    public IActionResult Find(int userId)
    {
        try
        {
            return Ok(accountService.find(userId));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpPut("update")]
    public IActionResult Update(IFormFile file, string sjson)
    {
        try
        {
            var setting = new JsonSerializerSettings();
            User user = JsonConvert.DeserializeObject<User>(sjson, setting);
            if (file != null)
            {
                var fileName = FileHelper.generateFileName(file.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                user.AvatarUrl = fileName;
            }
            else
            {
                user.AvatarUrl = accountService.find(user.UserId).AvatarUrl;
            }
            return Ok(new
            {
                Result = accountService.update(user)
            });
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpPut("changePassword")]
    public IActionResult ChangePassword(int userId, string currentPassword, string newPassword)
    {
        try
        {
            return Ok(new
            {
                Result = accountService.ChangePassword(userId, currentPassword, newPassword)
            });
        }
        catch
        { return BadRequest(); }
    }
}
