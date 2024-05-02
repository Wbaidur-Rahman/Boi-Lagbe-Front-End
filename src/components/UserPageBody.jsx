import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../assets/images/userAvatar.png";
import Book from "../components/Book";
import "../styles/UserPageBodyModule.css";
import ProfileUpdateForm from "./ProfileUpdateForm";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserPageBody({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [imgerror, setImgerror] = useState("");

  return (
    <div>
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
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {user && <h2>{user.name}</h2>}
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
      <div className="content-container">
        {!isEditing && (
          <div>
            <div style={{ padding: 30 }}>
              <h2>My Books</h2>
              <div id="user-books-container">
                {user &&
                  user.books.map((bookid) => (
                    <Book
                      key={bookid}
                      bookid={bookid}
                      user={user}
                      parent="userbooks"
                    />
                  ))}
              </div>
            </div>
            <div style={{ padding: 30 }}>
              <h2>Addcart Books</h2>
              <div id="user-books-container">
                {user &&
                  user.adcartbooks.map((bookid) => (
                    <Book
                      key={bookid}
                      bookid={bookid}
                      user={user}
                      parent="adcartbooks"
                    />
                  ))}
              </div>
            </div>
            <div style={{ padding: 30 }}>
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
          </div>
        )}
      </div>
    </div>
  );
}
