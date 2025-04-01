using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

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
        public IActionResult GetBooks(int numPerPage = 3, int pageNum = 1, int sort = 0, [FromQuery] List<string>? categories = null)
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


            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            // use the parameters passed in the URL to store the books that will be displayed in books variable

            var books = query
                .Skip((pageNum - 1) * numPerPage)
                .Take(numPerPage)
                .ToList();



            // calculate the total number of books
            int numBooks = query.Count();


            // store and return an object that contains the books and the number of books
            var returnObj = new
            {
                Books = books,
                numBooks

            };
            return Ok(returnObj);
        }

        // get all categories 
        [HttpGet("Categories")]
        public IActionResult GetCategories()
        {
            var categories = _context.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(categories);
        }

        [HttpPost("Add")]
        public IActionResult AddBook([FromBody] Book newBook){

            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);

        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookId);
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Category = updatedBook.Category;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Isbn = updatedBook.Isbn;
            existingBook.Price = updatedBook.Price;
            _context.Update(existingBook);
            _context.SaveChanges();


            return Ok(existingBook);

        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _context.Books.Find(bookId);

            if(book == null)
            {
                return NotFound(new { message = "Book not found" });
            }
            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
