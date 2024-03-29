﻿using System.ComponentModel.DataAnnotations;

namespace ContactAPI.Model
{
    public class ContactEntity
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }
}
