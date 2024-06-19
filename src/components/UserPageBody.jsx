import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../assets/images/userAvatar.png";
import Book from "../components/Book";
import "../styles/UserPageBodyModule.css";
import ProfileUpdateForm from "./ProfileUpdateForm";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserPageBody({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [imgerror, setImgerror] = useState("");

  const [cartbooks, setCartbooks] = useState(null);
  const [mybooks, setMybooks] = useState(null);

  useEffect(() => {
    if (user) {
      setCartbooks(user.adcartbooks);
      setMybooks(user.books);
    }
  }, [user]);

  function handleDeleteCarts(id) {
    setCartbooks(cartbooks.filter((book_id) => book_id !== id));
  }
  function handleDeleteMyBook(id) {
    setMybooks(mybooks.filter((book_id) => book_id !== id));
  }

  return (
    <div className="user-page-body">
      <div className="user-container">
        {user &&
          (user.avatar ? (
            <img
              src={`${apiUrl}/users/avatar/${user.avatar}`}
              alt="userAvatar"
            />
          ) : (
            <img src={avatar} alt="avatar" />
          ))}
        <div id="user-content">
          {isEditing ? (
            <>
              <ProfileUpdateForm
                user={user}
                setImgerror={setImgerror}
                setIsEditing={setIsEditing}
              />
              <p style={{ color: "red" }}>{imgerror}</p>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                textAlign: "left",
                margin: "50px 20px 0px 0px",
              }}
            >
              {user && <h3>{user.name}</h3>}
              {user && (
                <h3 style={{ fontSize: 14, color: "blue" }}>{user.email}</h3>
              )}
              <button
                onClick={() => setIsEditing(true)}
                style={{ marginTop: 20, width: 100, color: "green" }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
      {!isEditing && (
        <div id="mybooks-container" style={{ padding: 30 }}>
          <h2>My Books</h2>
          <div id="user-books-container">
            {mybooks &&
              mybooks.map((bookid) => (
                <Book
                  key={bookid}
                  bookid={bookid}
                  user={user}
                  parent="userbooks"
                  onDelete={handleDeleteMyBook}
                />
              ))}
          </div>
        </div>
      )}
      {!isEditing && (
        <div id="adcartbooks-container" style={{ padding: 30 }}>
          <h2>Addcart Books</h2>
          <div id="user-books-container">
            {cartbooks &&
              cartbooks.map((bookid) => (
                <Book
                  key={bookid}
                  bookid={bookid}
                  user={user}
                  parent="adcartbooks"
                  onDelete={handleDeleteCarts}
                />
              ))}
          </div>
        </div>
      )}
      {!isEditing && (
        <div id="rentbooks-container" style={{ padding: 30 }}>
          <h2>Rent Books</h2>
          <div id="user-books-container">
            {user &&
              user.rentbooks.map((bookid) => (
                <Book
                  key={bookid}
                  bookid={bookid}
                  user={user}
                  parent="rentbooks"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
