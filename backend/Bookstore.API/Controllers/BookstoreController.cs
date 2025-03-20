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
        public IActionResult GetBooks(int numPerPage = 3, int pageNum = 1, int sort = 0)
        {

            string? favBookCat = Request.Cookies["FavoriteBookCategory"];
            Console.WriteLine("-------COOKIE-------\n" + favBookCat);
            HttpContext.Response.Cookies.Append("FavoriteBookCategory", "Classic", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddMinutes(5)

            });

            // store all books as query
            var query = _context.Books.AsQueryable();

            // Apply sorting
            switch (sort)
            {
                case 1: // A-Z
                    query = query.OrderBy(b => b.Title);
                    break;
                case 2: // Z-A
                    query = query.OrderByDescending(b => b.Title);
                    break;
                case 0: //none
                    query = _context.Books;
                    break;
                    
            }

            // use the parameters passed in the URL to store the books that will be displayed in books variable

            var books = query
                .Skip((pageNum - 1) * numPerPage)
                .Take(numPerPage)
                .ToList();

            // calculate the total number of books
            int numBooks = _context.Books.Count();

            // store and return an object that contains the books and the number of books
            var returnObj = new
            {
                Books = books,
                numBooks = numBooks

            };
            return Ok(returnObj);
        }
    }

}
