using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _context;
        public BookstoreController(BookstoreDbContext temp) 
        { 
            _context = temp;
        }

        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return _context.Books.ToList();
        }
    }

}
