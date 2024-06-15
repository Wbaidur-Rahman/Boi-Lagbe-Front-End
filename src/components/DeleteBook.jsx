import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export default function DeleteBook({ user, bookid, setShowPopup, onDelete }) {
  // purpose is to updating user data
  async function onUpdate({ updatedUser }) {
    try {
      // deleting the book
      const response1 = await axios.delete(
        `${apiUrl}/books/${bookid}/${user._id}`
      );

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
      // refreshing the page for vanishing the deleted one
      onDelete(bookid);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // purpose is to remove userbook
  const removeUserBook = () => {
    setShowPopup(false);
    const updatedUser = {
      ...user,
      books: user.books.filter((id) => id !== bookid),
    };
    onUpdate({ updatedUser });
  };

  return (
    <button
      onClick={removeUserBook}
      style={{ padding: 5, marginTop: 10, color: "red" }}
    >
      Delete
    </button>
  );
}
