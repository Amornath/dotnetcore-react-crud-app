using ContactAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace ContactAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ContactEntity>Contacts { get; set; }
        public DbSet<UserEntity> Users { get; set; }
    }
}
