import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function Bookshelf(){

    const [bookshelf, setBookshelf] = useState<Book[]>([]);
    const [numPerPage, setNumPerPage] = useState<number>(3);
    const [pageNum, setPageNum] = useState<number>(1);
    const [numBooks, setNumBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sort, setSort] = useState<number>(0);



// fetch data when the page loads or the number of records per page, page number, number of books, or sort changes
    useEffect(() => {
        const fetchBook = async() => {
            const response = await fetch(`https://localhost:5000/api/Bookstore?numPerPage=${numPerPage}&pageNum=${pageNum}&sort=${sort}`);
            const data = await response.json();
            setBookshelf(data.books);
            setNumBooks(data.numBooks);
            setTotalPages(Math.ceil(numBooks/numPerPage))

        }

    fetchBook();
}, [numPerPage, pageNum, numBooks, sort]);

    return(
        <>
        <h1>Our Bookshelf</h1>
        <br></br>

        {/* table with books */}
        <table className="table table-hover  table-light table-striped">
            <thead className="h5">
                <tr>
                    <td>Title
                        <select value={sort} className="custom-thin-select" onChange={(s) => {
                            setSort(Number(s.target.value));
                            setPageNum(1);
                            }}>
                            <option value="0">-none-</option>
                            <option value="1">A-Z</option>
                            <option value="2">Z-A</option>  
                        </select>
                    </td>
                    <td>Author</td>
                    <td>Publisher</td>
                    <td>Category</td>
                    <td>Classification</td>
                    <td>ISBN</td>
                    <td>Page Count</td>
                    <td>Price</td>

                </tr>
            </thead>
            <tbody>
                {/* data from api call for each book */}
                {bookshelf.map((b)=>
                    <tr>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.publisher}</td>
                        <td>{b.category}</td>
                        <td> {b.classification}</td>
                        <td>{b.isbn}</td>
                        <td>{b.pageCount}</td>
                        <td>${b.price.toFixed(2)}</td>
                    </tr>
                )}
            </tbody>

        </table>

        <br/>

        {/* previous page button */}

        <button type="button" className="btn btn-sm btn-primary" disabled={pageNum === 1} onClick={() => setPageNum(pageNum-1)}>Previous</button>
            
            
        {/* dynamically create a button for every page */}
        {[...Array(totalPages)].map((_,i) => (
            <button  type="button" className="btn btn-sm btn-secondary"key={i + 1} disabled={pageNum === i + 1}onClick={() => setPageNum(i + 1)}>
                {i + 1}
            </button>
        ))}

        {/* next page button */}
        <button type="button" className="btn btn-sm btn-primary"disabled={pageNum === totalPages} onClick = {() => setPageNum(pageNum + 1)}>Next</button>
        
        {/*Allow users to choose how many records to show per page */}
        <div>
            <br></br>
            <label>
                Results Per Page:
                <select className="form-select form-select-sm" value={numPerPage} onChange={(p) => {
                    setNumPerPage(Number(p.target.value));
                    setPageNum(1);
                }}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </label>
        </div>
    </>
    )
}

export default Bookshelf;