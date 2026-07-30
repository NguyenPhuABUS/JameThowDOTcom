using JamesThewDOTcom.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace JamesThewDOTcom.Services;

public class ContentServiceImpl : ContentService
{
    private DatabaseContext db;
    private IConfiguration configuration;
    private IHttpContextAccessor httpContextAccessor;
    public ContentServiceImpl(DatabaseContext db, IConfiguration configuration
        , IHttpContextAccessor httpContextAccessor
        )
    {
        this.db = db;
        this.configuration = configuration;
        this.httpContextAccessor = httpContextAccessor;
    }
    private bool UserHasRoles(params string[] roles)
    {
        var userId = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return false;

        int userIdInt = int.Parse(userId);
        var user = db.Users.Include(u => u.Roles).FirstOrDefault(u => u.UserId == userIdInt);

        if (user == null) return false;

        return user.Roles.Any(r => roles.Contains(r.RoleName));
    }
    public dynamic findContentByRole(string username)
    {
        // Tìm user trong cơ sở dữ liệu dựa trên username
        var user = db.Users.Include(u => u.Roles).FirstOrDefault(u => u.Username == username);
        if (user == null)
        {
            return new { message = "User not found." };
        }

        // Kiểm tra xem user có vai trò Admin, User Super, hoặc JamesThewDOTcom không
        bool isAdminOrModerator = user.Roles.Any(r => r.RoleName == "Admin" || r.RoleName == "User Super" || r.RoleName == "JamesThewDOTcom");

        // Kiểm tra xem user có vai trò User không
        bool isUser = user.Roles.Any(r => r.RoleName == "User");

        // Nếu user có vai trò Admin hoặc Moderator
        if (isAdminOrModerator)
        {
            // Trả về tất cả nội dung
            return db.Contents.Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        // Nếu user có vai trò User
        else if (isUser)
        {
            // Trả về chỉ nội dung miễn phí
            return db.Contents.Where(c => c.IsFree == true).Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        else
        {
            // Nếu user không có vai trò thích hợp, trả về thông báo lỗi
            return new { message = "Access Denied: You do not have the required role to view this content." };
        }
    }
    public dynamic findByCategoryIdFree(int categoryId)
    {
        return db.Contents.Where(c => c.CategoryId == categoryId && c.IsFree == true).Select(c => new
        {
            contentId = c.ContentId,
            title = c.Title,
            contentType = c.ContentType,
            content1 = c.Content1,
            imageUrl = configuration["ImageUrl"] + c.ImageUrl,
            createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
            updatedAt = c.UpdatedAt,
            isFree = c.IsFree,
            username = c.User.FullName,
            categoryName = c.Category.CategoryName
        }).ToList();
    }
    public dynamic findByCategoryIdNotFree(string username, int categoryId)
    {
        // Tìm user trong cơ sở dữ liệu dựa trên username
        var user = db.Users.Include(u => u.Roles).FirstOrDefault(u => u.Username == username);
        if (user == null)
        {
            return new { message = "User not found." };
        }

        // Kiểm tra xem user có vai trò Admin, User Super, hoặc JamesThewDOTcom không
        bool isAdminOrModerator = user.Roles.Any(r => r.RoleName == "Admin" || r.RoleName == "User Super" || r.RoleName == "JamesThewDOTcom");

        // Kiểm tra xem user có vai trò User không
        bool isUser = user.Roles.Any(r => r.RoleName == "User");

        // Nếu user có vai trò Admin hoặc Moderator
        if (isAdminOrModerator)
        {
            // Trả về tất cả nội dung
            return db.Contents.Where(c => c.CategoryId == categoryId).Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        // Nếu user có vai trò User
        else if (isUser)
        {
            // Trả về chỉ nội dung miễn phí
            return db.Contents.Where(c => c.CategoryId == categoryId && c.IsFree == true).Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        else
        {
            // Nếu user không có vai trò thích hợp, trả về thông báo lỗi
            return new { message = "Access Denied: You do not have the required role to view this content." };
        }
    }
    public dynamic findAllFree()
    {
        return db.Contents.Where(c => c.IsFree == true).Select(c => new
        {
            contentId = c.ContentId,
            title = c.Title,
            contentType = c.ContentType,
            content1 = c.Content1,
            imageUrl = configuration["ImageUrl"] + c.ImageUrl,
            createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
            updatedAt = c.UpdatedAt,
            isFree = c.IsFree,
            username = c.User.FullName,
            categoryName = c.Category.CategoryName
        }).ToList();
    }
    public dynamic findByKeywordFree(string keyword)
    {
        return db.Contents.Where(c => c.Title.Contains(keyword) && c.IsFree == true).Select(c => new
        {
            contentId = c.ContentId,
            title = c.Title,
            contentType = c.ContentType,
            content1 = c.Content1,
            imageUrl = configuration["ImageUrl"] + c.ImageUrl,
            createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
            updatedAt = c.UpdatedAt,
            isFree = c.IsFree,
            username = c.User.FullName,
            categoryName = c.Category.CategoryName
        }).ToList();
    }
    public dynamic findByKeywordNotFree(string username, string keyword)
    {
        // Tìm user trong cơ sở dữ liệu dựa trên username
        var user = db.Users.Include(u => u.Roles).FirstOrDefault(u => u.Username == username);
        if (user == null)
        {
            return new { message = "User not found." };
        }

        // Kiểm tra xem user có vai trò Admin, User Super, hoặc JamesThewDOTcom không
        bool isAdminOrModerator = user.Roles.Any(r => r.RoleName == "Admin" || r.RoleName == "User Super" || r.RoleName == "JamesThewDOTcom");

        // Kiểm tra xem user có vai trò User không
        bool isUser = user.Roles.Any(r => r.RoleName == "User");

        // Nếu user có vai trò Admin hoặc Moderator
        if (isAdminOrModerator)
        {
            // Trả về tất cả nội dung
            return db.Contents.Where(c => c.Title.Contains(keyword)).Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        // Nếu user có vai trò User
        else if (isUser)
        {
            // Trả về chỉ nội dung miễn phí
            return db.Contents.Where(c => c.Title.Contains(keyword) && c.IsFree == true).Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        else
        {
            // Nếu user không có vai trò thích hợp, trả về thông báo lỗi
            return new { message = "Access Denied: You do not have the required role to view this content." };
        }
    }
    public dynamic findLatetFree(int n)
    {
        return db.Contents.Where(c => c.IsFree == true).OrderByDescending(c => c.ContentId).Take(n).Select(c => new
        {
            contentId = c.ContentId,
            title = c.Title,
            contentType = c.ContentType,
            content1 = c.Content1,
            imageUrl = configuration["ImageUrl"] + c.ImageUrl,
            createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
            updatedAt = c.UpdatedAt,
            isFree = c.IsFree,
            username = c.User.FullName,
            categoryName = c.Category.CategoryName
        }).ToList();
    }
    public dynamic findLatetNotFree(string username, int n)
    {
        // Tìm user trong cơ sở dữ liệu dựa trên username
        var user = db.Users.Include(u => u.Roles).FirstOrDefault(u => u.Username == username);
        if (user == null)
        {
            return new { message = "User not found." };
        }

        // Kiểm tra xem user có vai trò Admin, User Super, hoặc JamesThewDOTcom không
        bool isAdminOrModerator = user.Roles.Any(r => r.RoleName == "Admin" || r.RoleName == "User Super" || r.RoleName == "JamesThewDOTcom");

        // Kiểm tra xem user có vai trò User không
        bool isUser = user.Roles.Any(r => r.RoleName == "User");

        // Nếu user có vai trò Admin hoặc Moderator
        if (isAdminOrModerator)
        {
            // Trả về tất cả nội dung
            return db.Contents.OrderByDescending(c => c.ContentId).Take(n).Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        // Nếu user có vai trò User
        else if (isUser)
        {
            // Trả về chỉ nội dung miễn phí
            return db.Contents.Where(c => c.IsFree == true).OrderByDescending(c => c.ContentId).Take(n).Select(c => new
            {
                contentId = c.ContentId,
                title = c.Title,
                contentType = c.ContentType,
                content1 = c.Content1,
                imageUrl = configuration["ImageUrl"] + c.ImageUrl,
                createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
                updatedAt = c.UpdatedAt,
                isFree = c.IsFree,
                username = c.User.FullName,
                categoryName = c.Category.CategoryName
            }).ToList();
        }
        else
        {
            // Nếu user không có vai trò thích hợp, trả về thông báo lỗi
            return new { message = "Access Denied: You do not have the required role to view this content." };
        }
    }
    public async Task<PagedResult<Content>> GetPagedContentsAsync(int page, int pageSize, int? categoryId = null)
    {
        var query = db.Contents.AsQueryable();

        if (categoryId.HasValue)
        {
            query = query.Where(c => c.CategoryId == categoryId.Value);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Content>
        {
            TotalCount = totalCount,
            Items = items
        };
    }

    public bool create(Content content)
    {
        try
        {
            db.Contents.Add(content);
            return db.SaveChanges() > 0;
        }
        catch { return false; }
    }
    public dynamic recipesUser(string username)
    {
        return db.Contents.Where(c => c.User.Username == username).Select(c => new
        {
            contentId = c.ContentId,
            title = c.Title,
            contentType = c.ContentType,
            content1 = c.Content1,
            imageUrl = configuration["ImageUrl"] + c.ImageUrl,
            createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
            updatedAt = c.UpdatedAt,
            isFree = c.IsFree,
            username = c.User.FullName,
            categoryName = c.Category.CategoryName
        }).ToList();
    }
    public dynamic recipesDetails(int contentId)
    {
        return db.Contents.Where(c => c.ContentId == contentId).Select(c => new
        {
            contentId = c.ContentId,
            title = c.Title,
            contentType = c.ContentType,
            content1 = c.Content1,
            imageUrl = configuration["ImageUrl"] + c.ImageUrl,
            createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
            updatedAt = c.UpdatedAt,
            isFree = c.IsFree,
            username = c.User.FullName,
            categoryName = c.Category.CategoryName
        }).FirstOrDefault();
    }

    public dynamic getContentsByUserId(int userId)
    {
        return db.Contents.Where(c => c.User.UserId == userId).Select(c => new
        {
            contentId = c.ContentId,
            title = c.Title,
            contentType = c.ContentType,
            content1 = c.Content1,
            imageUrl = configuration["ImageUrl"] + c.ImageUrl,
            createdAt = c.CreatedAt.ToString("dd/MM/yyyy"),
            updatedAt = c.UpdatedAt,
            isFree = c.IsFree,
            username = c.User.FullName,
            categoryName = c.Category.CategoryName
        }).ToList();
    }
}