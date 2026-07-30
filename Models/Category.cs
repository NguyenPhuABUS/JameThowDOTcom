using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public virtual ICollection<Content> Contents { get; set; } = new List<Content>();
}
