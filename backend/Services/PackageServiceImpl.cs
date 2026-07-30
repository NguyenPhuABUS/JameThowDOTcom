using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public class PackageServiceImpl : PackageService
{
    private DatabaseContext db;
    private IConfiguration configuration;
    public PackageServiceImpl(DatabaseContext db, IConfiguration configuration)
    {
        this.db = db;
        this.configuration = configuration;
    }
    public dynamic findAll()
    {
        return db.Packages.Select(p => new
        {
            packageId = p.PackageId,
            packageName = p.PackageName,
            price = p.Price,
            description = p.Description,
            durationMonths = p.DurationMonths,
        }).ToList();
    }
}