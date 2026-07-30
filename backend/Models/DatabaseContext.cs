using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace JamesThewDOTcom.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Announcement> Announcements { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Content> Contents { get; set; }

    public virtual DbSet<Contest> Contests { get; set; }

    public virtual DbSet<ContestEntry> ContestEntries { get; set; }

    public virtual DbSet<Faq> Faqs { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Package> Packages { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Subscription> Subscriptions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-6FEJ350\\PHUCNGUYEN;Database=JamesThewDOTcom;User ID=sa;Password=123456;Trusted_Connection=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Announcement>(entity =>
        {
            entity.HasKey(e => e.AnnouncementId).HasName("PK__Announce__C640A82DB697C867");

            entity.Property(e => e.AnnouncementId).HasColumnName("announcement_id");
            entity.Property(e => e.Content)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__D54EE9B4A3A1252D");

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("category_name");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.ContactId).HasName("PK__Contacts__024E7A869D1B7CF6");

            entity.Property(e => e.ContactId).HasColumnName("contact_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Message)
                .HasColumnType("text")
                .HasColumnName("message");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Content>(entity =>
        {
            entity.HasKey(e => e.ContentId).HasName("PK__Contents__655FE51082E30142");

            entity.Property(e => e.ContentId).HasColumnName("content_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Content1)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.ContentType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("content_type");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_url");
            entity.Property(e => e.IsFree)
                .HasDefaultValue(false)
                .HasColumnName("is_free");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Category).WithMany(p => p.Contents)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Contents__catego__440B1D61");

            entity.HasOne(d => d.User).WithMany(p => p.Contents)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Contents__user_i__4316F928");
        });

        modelBuilder.Entity<Contest>(entity =>
        {
            entity.HasKey(e => e.ContestId).HasName("PK__Contests__3148827E0E150A63");

            entity.Property(e => e.ContestId).HasColumnName("contest_id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.WinnerUserId).HasColumnName("winner_user_id");

            entity.HasOne(d => d.WinnerUser).WithMany(p => p.Contests)
                .HasForeignKey(d => d.WinnerUserId)
                .HasConstraintName("FK__Contests__winner__46E78A0C");
        });

        modelBuilder.Entity<ContestEntry>(entity =>
        {
            entity.HasKey(e => e.EntryId).HasName("PK__ContestE__810FDCE199E23460");

            entity.Property(e => e.EntryId).HasColumnName("entry_id");
            entity.Property(e => e.ContentId).HasColumnName("content_id");
            entity.Property(e => e.ContestId).HasColumnName("contest_id");
            entity.Property(e => e.SubmissionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("submission_date");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Content).WithMany(p => p.ContestEntries)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__ContestEn__conte__4CA06362");

            entity.HasOne(d => d.Contest).WithMany(p => p.ContestEntries)
                .HasForeignKey(d => d.ContestId)
                .HasConstraintName("FK__ContestEn__conte__4AB81AF0");

            entity.HasOne(d => d.User).WithMany(p => p.ContestEntries)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__ContestEn__user___4BAC3F29");
        });

        modelBuilder.Entity<Faq>(entity =>
        {
            entity.HasKey(e => e.FaqId).HasName("PK__FAQs__66734BAFB53165BF");

            entity.ToTable("FAQs");

            entity.Property(e => e.FaqId).HasColumnName("faq_id");
            entity.Property(e => e.Answer)
                .HasColumnType("text")
                .HasColumnName("answer");
            entity.Property(e => e.Question)
                .HasColumnType("text")
                .HasColumnName("question");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__7A6B2B8C5D9292F9");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");
            entity.Property(e => e.Content)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.ContentId).HasColumnName("content_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.ContentNavigation).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__Feedback__conten__5165187F");

            entity.HasOne(d => d.User).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Feedback__user_i__5070F446");
        });

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.PackageId).HasName("PK__Packages__322035CCDBD9412D");

            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.PackageName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payments__ED1FC9EAD4CC173B");

            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Amount)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("amount");
            entity.Property(e => e.PaymentDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("payment_date");
            entity.Property(e => e.PaymentMethod)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("payment_method");
            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Subscription).WithMany(p => p.Payments)
                .HasForeignKey(d => d.SubscriptionId)
                .HasConstraintName("FK__Payments__subscr__5EBF139D");

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Payments__user_i__5DCAEF64");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.RatingId).HasName("PK__Ratings__D35B278B00676D7F");

            entity.Property(e => e.RatingId).HasColumnName("rating_id");
            entity.Property(e => e.ContentId).HasColumnName("content_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Rating1).HasColumnName("rating");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Content).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__Ratings__content__6B24EA82");

            entity.HasOne(d => d.User).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Ratings__user_id__6A30C649");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__760965CCAFDBAFFD");

            entity.HasIndex(e => e.RoleName, "UQ__Roles__783254B19EA2F514").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.HasKey(e => e.SubscriptionId).HasName("PK__Subscrip__863A7EC1B50F080C");

            entity.ToTable(tb => tb.HasTrigger("trg_UpdateUserRoleOnSubscriptionExpiry"));

            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("active")
                .HasColumnName("status");
            entity.Property(e => e.Type)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("type");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Package).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__Subscript__Packa__160F4887");

            entity.HasOne(d => d.User).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Subscript__user___59FA5E80");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__B9BE370FC8417339");

            entity.HasIndex(e => e.Email, "UQ__Users__AB6E61649D5850CD").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__Users__F3DBC5721D351ED2").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("avatar_url");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("full_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__UserRoles__role___656C112C"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__UserRoles__user___6477ECF3"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("PK__UserRole__6EDEA1537F7AF625");
                        j.ToTable("UserRoles");
                        j.IndexerProperty<int>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<int>("RoleId").HasColumnName("role_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
