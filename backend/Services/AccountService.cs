using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public interface AccountService
{
    public bool create(User user);
    public bool login(string username, string password);
    public dynamic findByUsername(string username);
    public bool update(User user);
    public dynamic find(int userId);
    public bool ChangePassword(int userId, string currentPassword, string newPassword);


}
