using JamesThewDOTcom.Models;
using Microsoft.EntityFrameworkCore;

namespace JamesThewDOTcom.Services;

public class AccountServiceImpl : AccountService
{
    private DatabaseContext db;
    private IConfiguration configuration;

    public AccountServiceImpl(DatabaseContext db, IConfiguration configuration)
    {
        this.db = db;
        this.configuration = configuration;
    }
    public bool login(string username, string password)
    {
        try
        {
            var acc = db.Users.SingleOrDefault(a => a.Username == username);
            if (acc != null)
            {
                return BCrypt.Net.BCrypt.Verify(password, acc.Password);
            }
            return false;
        }
        catch
        {
            return false;
        }
    }
    public bool create(User user)
    {
        try
        {
            db.Users.Add(user);
            return db.SaveChanges() > 0;
        }
        catch { return false; }
    }
    public dynamic findByUsername(string username)
    {
        return db.Users.Where(a => a.Username == username).Select(a => new
        {
            userId = a.UserId,
            username = a.Username,
            password = a.Password,
            email = a.Email,
            fullname = a.FullName,
            avatarUrl = configuration["ImageUrl"] + a.AvatarUrl,

        }).SingleOrDefault();
    }
    public bool update(User user)
    {
        try
        {
            db.Entry(user).State = EntityState.Modified;
            return db.SaveChanges() > 0;
        }
        catch { return false; }
    }
    public dynamic find(int userId)
    {
        return db.Users.AsNoTracking().Where(a => a.UserId == userId).Select(a => new
        {
            userId = a.UserId,
            username = a.Username,
            password = a.Password,
            email = a.Email,
            fullname = a.FullName,
            avatarUrl = configuration["ImageUrl"] + a.AvatarUrl,
        }).SingleOrDefault();
    }
    public bool ChangePassword(int userId, string currentPassword, string newPassword)
    {
        try
        {
            var user = db.Users.FirstOrDefault(u => u.UserId == userId);

            if (user != null)
            {
                // Verify current password
                if (BCrypt.Net.BCrypt.Verify(currentPassword, user.Password))
                {
                    // Hash the new password
                    string hashedNewPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);

                    // Update user's password
                    user.Password = hashedNewPassword;

                    // Mark entity as modified
                    db.Entry(user).State = EntityState.Modified;

                    // Save changes to database
                    db.SaveChanges();

                    return true;
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            return false;
        }
    }
}
