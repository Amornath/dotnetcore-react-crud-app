using ContactAPI.Model;
using ContactAPI.Services;
using ContactAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContactAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private ContactService contactService;
        public ContactController(ContactService _contactService)
        {
            this.contactService = _contactService;
        }

        [HttpGet]
        public List<ContactViewModel> Get(int pageIndex = 1, int pageSize = 10)
        {
            var data = contactService.GetAllContacts(pageIndex, pageSize);

            return data;
        }

        [HttpPost]
        public ActionResult<ContactViewModel> Create(ContactViewModel contact)
        {
            var createdContact = contactService.CreateContact(contact);
            return Ok(createdContact);
        }

        [HttpPut]
        public IActionResult Update(ContactViewModel contact)
        {
            var exist_contact = contactService.GetContactById(contact.ID);
            if (exist_contact == null)
            {
                return BadRequest();
            }

            contactService.UpdateContact(contact);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var contact = contactService.GetContactById(id);
            if (contact == null)
            {
                return NotFound();
            }

            contactService.DeleteContact(id);
            return NoContent();
        }
    }
}
