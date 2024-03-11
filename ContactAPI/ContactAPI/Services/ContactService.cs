using ContactAPI.Data;
using ContactAPI.Model;
using ContactAPI.ViewModels;

namespace ContactAPI.Services
{
    public class ContactService
    {
        private ApplicationDbContext _db;


        public ContactService(ApplicationDbContext db)
        {
            this._db = db;
        }

        public List<ContactViewModel> GetAllContacts(int pageIndex, int pageSize)
        {
            var result = (from c in _db.Contacts
                          select new ContactViewModel
                          {
                              ID= c.ID,
                              Name= c.Name,
                              Email= c.Email,
                              Address= c.Address,
                              PhoneNumber= c.PhoneNumber,
                          }).AsQueryable();

            return result.OrderByDescending(o => o.ID).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        }

        public ContactViewModel CreateContact(ContactViewModel contact)
        {
            var newContact = new ContactEntity
            {
                Name = contact.Name,
                Email = contact.Email,
                Address = contact.Address,
                PhoneNumber = contact.PhoneNumber
            };

            _db.Contacts.Add(newContact);
            _db.SaveChanges();

            contact.ID = newContact.ID; // Update the contact entity with the new ID
            return contact;
        }

        public void UpdateContact(ContactViewModel contact)
        {
            var existingContact = _db.Contacts.Find(contact.ID);
            if (existingContact != null)
            {
                existingContact.Name = contact.Name;
                existingContact.Email = contact.Email;
                existingContact.Address = contact.Address;
                existingContact.PhoneNumber = contact.PhoneNumber;

                _db.SaveChanges();
            }
        }

        public void DeleteContact(int id)
        {
            var contact = _db.Contacts.Find(id);
            if (contact != null)
            {
                _db.Contacts.Remove(contact);
                _db.SaveChanges();
            }
        }

        public ContactViewModel GetContactById(int id)
        {
            var contact = _db.Contacts.Find(id);
            if (contact != null)
            {
                return new ContactViewModel
                {
                    ID = contact.ID,
                    Name = contact.Name,
                    Email = contact.Email,
                    Address = contact.Address,
                    PhoneNumber = contact.PhoneNumber
                };
            }
            return null;
        }
    }
}
