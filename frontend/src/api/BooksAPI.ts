import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  numBooks: number;
}
const API_URL = "https://bookstore-esplin-backend.azurewebsites.net";
export const fetchBooks = async (
  numPerPage: number,
  pageNum: number,
  sort: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categories=${encodeURIComponent(cat)}`)
      .join("&");
    const response = await fetch(
      `${API_URL}?numPerPage=${numPerPage}&pageNum=${pageNum}&sort=${sort}${selectedCategories.length ? `&${categoryParams}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// function to pass form data to the back end to add a book
export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    console.log("Sending book data:", newBook); // Debugging log
    const response = await fetch(`${API_URL}/Add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding book", error);
    throw error;
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    console.log("Sending book data:", updatedBook); // Debugging log
    const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updated book:", error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
