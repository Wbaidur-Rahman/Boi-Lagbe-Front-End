import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserPageBodyModule.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Book({ bookid, user, parent }) {
  const [book, setBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(`${apiUrl}/books?id=${bookid}`);
        setBook(response.data.book);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
    fetchBook();
  }, [bookid]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  async function onUpdate({ updatedUser, bookid }) {
    try {
      // deleting the book
      const response1 = await axios.delete(`${apiUrl}/books/${bookid}`);
      console.log(response1.data);

      // removing book from user
      const response = await axios.put(
        `${apiUrl}/users/${user._id}`,
        updatedUser
      );

      if (response.data) {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // purpose is to remove userbook
  const removeUserBook = () => {
    const updatedUser = {
      ...user,
      books: user.books.filter((id) => id !== bookid),
    };
    onUpdate({ updatedUser, bookid });
  };

  return (
    <>
      <div id="book">
        {book && (
          <>
            <div className="book-card" onClick={togglePopup}>
              <img
                src={`${apiUrl}/books/book-covers/${book.cover}`}
                alt="bookCover"
              />
              <p>{book.title}</p>
            </div>
            {showPopup && (
              <>
                <div className="popup">
                  <div className="popup-content">
                    <span className="close" onClick={togglePopup}>
                      &times;
                    </span>
                    <img
                      src={`${apiUrl}/books/book-covers/${book.cover}`}
                      alt="bookCover"
                    />
                    <p>Title: {book.title}</p>
                    <p>Author: {book.data.author}</p>
                    <p>Category: {book.data.category}</p>
                    <p>Genre: {book.data.genre}</p>
                    <p>Pages: {book.data.pages}</p>
                    <p>PageType: {book.data.pagetype}</p>

                    {parent === "userbooks" && (
                      <button onClick={removeUserBook}>Delete</button>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
