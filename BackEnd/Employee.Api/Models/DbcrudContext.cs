using Microsoft.EntityFrameworkCore;

namespace Employee.Api.Models;

public partial class DbcrudContext : DbContext
{

    public DbcrudContext(DbContextOptions<DbcrudContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Emploee> Emploees { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Emploee>(entity =>
        {
            entity.HasKey(e => e.IdEmployee).HasName("PK__Emploee__51C8DD7A45532ACA");

            entity.ToTable("Emploee");

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
