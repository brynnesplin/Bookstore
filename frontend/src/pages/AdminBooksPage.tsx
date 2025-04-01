import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
  const [bookshelf, setBookshelf] = useState<Book[]>([]);
  const [numPerPage, setNumPerPage] = useState<number>(3);
  const [pageNum, setPageNum] = useState<number>(1);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(numPerPage, pageNum, 0, []);
        setBookshelf(data.books);
        setTotalPages(Math.ceil(data.numBooks / numPerPage));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [numPerPage, pageNum]);

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;
    try {
      await deleteBook(bookId);
      setBookshelf(bookshelf.filter((b) => b.bookId !== bookId));
    } catch (error) {
      alert("Failed to delete project. Please try again.");
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin-Books</h1>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}
      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(numPerPage, pageNum, 0, []).then((data) =>
              setBookshelf(data.books)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(numPerPage, pageNum, 0, []).then((data) =>
              setBookshelf(data.books)
            );
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}
      <table className="table table-light table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookshelf.map((b) => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setEditingBook(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    handleDelete(b.bookId);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        numPerPage={numPerPage}
        onPageChange={setPageNum}
        onNumPerPageChange={(newNumPerPage) => {
          setNumPerPage(newNumPerPage);
          setPageNum(1);
        }}
      />
    </div>
  );
};

export default AdminBooksPage;
