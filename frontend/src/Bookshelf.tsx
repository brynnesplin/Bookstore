import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function Bookshelf(){

    const [bookshelf, setBookshelf] = useState<Book[]>([])

    useEffect(() => {
        const fetchBook = async() => {
            const response = await fetch("https://localhost:5000/api/Bookstore")
            const data = await response.json();
            setBookshelf(data);

        }

    fetchBook();
}, []);

    return(
        <>
        {bookshelf.map((b)=>
        <div>
            {b.title}
            {b.author}
            {b.category}
            {b.category}
            {b.classification}
            {b.isbn}
            {b.pageCount}
            {b.price}
        </div>
)}
        </>
    )
}

export default Bookshelf;