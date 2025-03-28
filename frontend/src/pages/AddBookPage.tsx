import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";



function AddBookPage(){
    const navigate = useNavigate();
    const {bookTitle, bookId, bookPrice} = useParams();
    const {addToCart} = useCart();
    const [bookQuantity, setQuantity] = useState<number>(0);

const handleAddToCart = () => {
    const newItem: CartItem = {
        bookId: Number(bookId),
        bookTitle : bookTitle || "No Book Found",
        bookQuantity,
        bookPrice: Number(bookPrice),
        bookSub: bookQuantity * Number(bookPrice)};
    addToCart(newItem);
    navigate('/cart');
};

    return(

        <>
        <Title/>
        <div className = "row">
            <div className = "col-6 offset-3">
                <div className = "row">
                    <h2>Buy {bookTitle}</h2>
                    <input type="number" placeholder="Enter quantity" min={1} value={bookQuantity || ''} onChange={(x) => setQuantity(Number(x.target.value))}/>
                </div>
                <br></br>
                <div className = "row">
                    <button className = "btn btn-primary" onClick={() =>handleAddToCart()}>Add to Cart</button>
                    <button className = "btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>


        </div>
        </>
    );
};

export default AddBookPage;