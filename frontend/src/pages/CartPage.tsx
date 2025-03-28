import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <>
      {/* display all the line items */}
      <div className="col-12">
        <div className="row">
          <h2>Your Cart</h2>
        </div>
        <div className="row">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <table className="table">
              <tbody>
                {cart.map((item: CartItem) => (
                  <tr className="" key={item.bookId}>
                    <td>
                      <span className="badge bg-secondary">
                        {item.bookQuantity}
                      </span>
                    </td>
                    <td>{item.bookTitle}</td>
                    <td>${item.bookPrice.toFixed(2)}</td>
                    <td>${item.bookSub.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        // remove items from cart when trash button selected
                        onClick={() => removeFromCart(item.bookId)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="row">
          <h3>
            Total:{" "}
            {cart.reduce((sum, item) => sum + item.bookSub, 0).toFixed(2)}
          </h3>
        </div>
        <div className="row">
          <button className="btn btn-primary">Checkout</button>
        </div>
        <div className="row">
          <button
            onClick={() => navigate("/bookshelf")}
            className="btn btn-secondary"
          >
            Keep Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
