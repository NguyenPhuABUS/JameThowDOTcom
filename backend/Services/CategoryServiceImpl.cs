using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public class CategoryServiceImpl : CategoryService
{
    private DatabaseContext db;

    public CategoryServiceImpl(DatabaseContext db)
    {
        this.db = db;
    }
    public dynamic findAll()
    {
        return db.Categories.Select(c => new
        {
            categoryId = c.CategoryId,
            categoryName = c.CategoryName
        }).ToList();
    }
}
