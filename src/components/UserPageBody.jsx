import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../assets/images/userAvatar.png";
import Book from "../components/Book";
import "../styles/UserPageBodyModule.css";
import ProfileUpdateForm from "./ProfileUpdateForm";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserPageBody({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleProfileUpdate(userData) {
    try {
      const response = await axios.put(
        `${apiUrl}/users/${user._id}`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        console.log(response.data);
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setIsEditing(false);
      }
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);

      let msg;

      if (errors.name) {
        msg = errors.name.msg;
      } else if (errors.address) {
        msg = errors.address.msg;
      } else if (errors.avatar) {
        msg = errors.avatar.msg + ", 1 Mb allowed";
      } else {
        msg = "Something went wrong";
      }

      toast.error(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  }

  return (
    <>
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
            <ProfileUpdateForm
              user={user}
              onUpdate={handleProfileUpdate}
              setIsEditing={setIsEditing}
            />
          ) : (
            <>
              {user && <h2>{user.name}</h2>}
              {user && <h3>{user.email}</h3>}
              <button
                onClick={() => setIsEditing(true)}
                style={{ marginTop: 20 }}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
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
            <h2>Rent Books</h2>
            <div id="user-books-container">
              {user &&
                user.adcartbooks.map((bookid) => (
                  <Book
                    key={bookid}
                    bookid={bookid}
                    user={user}
                    parent="rentbooks"
                  />
                ))}
            </div>
          </div>
          <div style={{ padding: 30 }}>
            <h2>Addcart Books</h2>
            <div id="user-books-container">
              {user &&
                user.rentbooks.map((bookid) => (
                  <Book
                    key={bookid}
                    bookid={bookid}
                    user={user}
                    parent="adcartbooks"
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
