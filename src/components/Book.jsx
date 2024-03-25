import axios from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserPageBodyModule.css";

import { ToastContainer } from "react-toastify";
import AddCartBook from "./AddcartBook";
import DeleteBook from "./DeleteBook";
import RemoveFromCart from "./RemoveFromCart";
import RentTheBook from "./RentTheBook";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Book({ bookid, user, parent }) {
  const [book, setBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // fetching a book from api
  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(`${apiUrl}/books?id=${bookid}`);
        setBook(response.data.book);
        // console.log(book);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
    fetchBook();
  }, [bookid]);

  // showing the pop up window
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <ToastContainer />
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
                      <DeleteBook
                        user={user}
                        bookid={bookid}
                        setShowPopup={setShowPopup}
                      />
                    )}
                    {parent === "adcartbooks" && (
                      <RemoveFromCart
                        user={user}
                        bookid={bookid}
                        setShowPopup={setShowPopup}
                      />
                    )}
                    {user && parent === "HomePage" && (
                      <RentTheBook
                        user={user}
                        bookid={bookid}
                        setShowPopup={setShowPopup}
                      />
                    )}
                    {user && parent === "HomePage" && (
                      <AddCartBook
                        user={user}
                        bookid={bookid}
                        setShowPopup={setShowPopup}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
