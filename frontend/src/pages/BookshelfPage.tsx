import { useState } from "react";
import Bookshelf from "../components/Bookshelf";
import CategoryFilter from "../components/CategoryFilter";
import Title from "../components/Title";
import CartSummary from "../components/CartSummary";

function BookshelfPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);

  // display both the bookshelf and the category filters
  return (
    <>
      <div className="container mt-4">
        <CartSummary />
        <Title />
        <div className="row">
          <div className="col-md-2">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          </div>
          <div className="col-md-10">
            <Bookshelf
              selectedCategories={selectedCategories}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookshelfPage;
