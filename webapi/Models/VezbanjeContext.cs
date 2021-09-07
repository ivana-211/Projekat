using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class VezbanjeContext : DbContext
    {
        public DbSet<Nedelja> Vezbanje {get; set;}
        public DbSet<Dan> Dani {get; set;}
        public DbSet<Vezba> Vezbe {get; set;}
        public VezbanjeContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dan>()
                        .HasMany(s => s.Vezbe)
                        .WithOne(s => s.Dan)
                        .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Nedelja>()
                        .HasMany(s => s.Dani)
                        .WithOne(s => s.Nedelja)
                        .OnDelete(DeleteBehavior.Cascade);
            
            base.OnModelCreating(modelBuilder);
        }
    } 
}