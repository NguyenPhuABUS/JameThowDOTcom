using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public class RoleServiceImpl : RoleService
{
    private DatabaseContext db;

    public RoleServiceImpl(DatabaseContext db)
    {
        this.db = db;
    }
    public Role find(int id)
    {
        return db.Roles.Find(id);
    }

    public Role findByname(string rolename)
    {
        return db.Roles.SingleOrDefault(r => r.RoleName == rolename);
    }
}
