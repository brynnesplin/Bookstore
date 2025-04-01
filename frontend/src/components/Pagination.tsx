interface PaginationProps {
  currentPage: number;
  totalPages: number;
  numPerPage: number;
  onPageChange: (newPage: number) => void;
  onNumPerPageChange: (newNumPerPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  numPerPage,
  onPageChange,
  onNumPerPageChange,
}: PaginationProps) => {
  return (
    <div className="flex item-center justify-center mt-4">
      {/* previous page button */}

      <button
        type="button"
        className="btn btn-sm btn-primary"
        style={{ margin: "20px" }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {/* dynamically create a button for every page */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          style={{ margin: "10px" }}
          key={i + 1}
          disabled={currentPage === i + 1}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {/* next page button */}
      <button
        type="button"
        className="btn btn-sm btn-primary"
        style={{ margin: "10px" }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      {/*Allow users to choose how many records to show per page */}
      <div>
        <br></br>
        <label>
          Results Per Page:
          <select
            className="form-select form-select-sm"
            value={numPerPage}
            onChange={(p) => {
              onNumPerPageChange(Number(p.target.value));
              onPageChange(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Pagination;
