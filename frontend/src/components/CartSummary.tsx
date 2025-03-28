import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// shopping cart icon component
const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.bookSub, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.bookQuantity, 0);
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 15 px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        fontSize: "16px",
      }}
      onClick={() => navigate("/cart")}
    >
      🛒{" "}
      <strong>
        {/* display total quantity of books and total cost */}
        {totalQuantity} books: ${totalAmount.toFixed(2)}
      </strong>
    </div>
  );
};

export default CartSummary;
