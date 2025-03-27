import Title from "../components/Title";
import { useNavigate } from "react-router-dom";


function AddBookPage(){
    const navigate = useNavigate();

    return(
        <>
        <Title/>
        <h2>Add Item</h2>

        <div>
            <input type="number" placeholder="Enter quantity"></input>
            <button>Add to Cart</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
        </>
    );
}

export default AddBookPage;