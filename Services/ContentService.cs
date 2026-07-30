using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public interface ContentService
{
    public dynamic findByCategoryIdFree(int categoryId);
    public dynamic findAllFree();
    public dynamic recipesDetails(int contentId);
    public dynamic recipesUser(string username);
    public dynamic findByKeywordFree(string keyword);
    public dynamic findLatetFree(int n);
    public dynamic findContentByRole(string username);
    public dynamic findByCategoryIdNotFree(string username, int categoryId);
    public dynamic findByKeywordNotFree(string username, string keyword);
    public dynamic findLatetNotFree(string username, int n);
    Task<PagedResult<Content>> GetPagedContentsAsync(int page, int pageSize, int? categoryId = null);
    public bool create(Content content);
    public dynamic getContentsByUserId(int userId);
}
