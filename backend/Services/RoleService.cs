using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public interface RoleService
{
    public Role find(int id);
    public Role findByname(string rolename);
}
