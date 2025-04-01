import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function Bookshelf({
  selectedCategories,
  pageNum,
  setPageNum,
}: {
  selectedCategories: string[];
  pageNum: number;
  setPageNum: (pageNum: number) => void;
}) {
  const [bookshelf, setBookshelf] = useState<Book[]>([]);
  const [numPerPage, setNumPerPage] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sort, setSort] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // fetch data when the page loads or the number of records per page, page number, number of books, or sort changes
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          numPerPage,
          pageNum,
          sort,
          selectedCategories
        );

        setBookshelf(data.books);
        setTotalPages(Math.ceil(data.numBooks / numPerPage));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [numPerPage, pageNum, sort, selectedCategories]);

  if (loading) return <p>Loading Bookshelf..</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* table with books */}
      <table className="table table-hover  table-light table-striped">
        <thead className="h5">
          <tr>
            <th>
              Title
              <select
                value={sort}
                className="custom-thin-select"
                onChange={(s) => {
                  setSort(Number(s.target.value));
                  setPageNum(1);
                }}
              >
                <option value="0">-none-</option>
                <option value="1">A-Z</option>
                <option value="2">Z-A</option>
              </select>
            </th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Category</th>
            <th>Classification</th>
            <th>ISBN</th>
            <th>Page Count</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* data from api call for each book */}
          {bookshelf.map((b) => (
            <tr key={b.bookId}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.category}</td>
              <td> {b.classification}</td>
              <td>{b.isbn}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() =>
                    // when the buy button is clicked navigate to the add item page
                    navigate(`/addItem/${b.title}/${b.bookId}/${b.price}`)
                  }
                >
                  Buy
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
    </>
  );
}

export default Bookshelf;
