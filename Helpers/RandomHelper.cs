namespace JamesThewDOTcom.Helpers;

public class RandomHelper
{
	public static string gennarateSecurityCode()
	{
		return Guid.NewGuid().ToString().Replace("-", "");

	}
}
