using System.ComponentModel.DataAnnotations;

namespace ContactAPI.Model
{
    public class UserEntity
    {
        [Key]
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
