using Microsoft.EntityFrameworkCore;
using JamesThewDOTcom.Converters;
using JamesThewDOTcom.Models;
using JamesThewDOTcom.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddControllersWithViews();
builder.Services.AddSession();

var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
builder.Services.AddControllers().AddJsonOptions(option => {
    option.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
});
builder.Services.AddDbContext<DatabaseContext>(option =>
{
    option.UseLazyLoadingProxies().UseSqlServer(connectionString);
});

// Đăng ký IHttpContextAccessor
builder.Services.AddHttpContextAccessor();

/* Khai báo các service */
builder.Services.AddScoped<AccountService, AccountServiceImpl>();
builder.Services.AddScoped<RoleService, RoleServiceImpl>();
builder.Services.AddScoped<CategoryService, CategoryServiceImpl>();
builder.Services.AddScoped<ContentService, ContentServiceImpl>();
builder.Services.AddScoped<PaymentService, PaymentServiceImpl>();
builder.Services.AddScoped<FeedbackService, FeedbackServiceImpl>();
builder.Services.AddScoped<RatingService, RatingServiceImpl>();
builder.Services.AddScoped<ContestService, ContestServiceImpl>();
builder.Services.AddScoped<ContestEntryService, ContestEntryServiceImpl>();
builder.Services.AddScoped<PackageService, PackageServiceImpl>();



var app = builder.Build();

app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );

//app.UseMiddleware<BasicAuthMiddleware>();
//app.UseMiddleware<Log1Middleware>();
//app.UseMiddleware<SecurityMiddleware>();
//app.UseMiddleware<Log2Middleware>();
//app.UseMiddleware<Log3Middleware>();

app.UseStaticFiles();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}"
);

app.Run();
