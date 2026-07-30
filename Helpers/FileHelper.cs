namespace JamesThewDOTcom.Helpers;

public class FileHelper
{
    public static string generateFileName(string fileName)
    {
        var name = Guid.NewGuid().ToString().Replace("-","");
        var lastINdex = fileName.LastIndexOf('.');
        var ext = fileName.Substring(lastINdex);
        return name + ext;
    }
}
