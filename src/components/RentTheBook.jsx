import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RentTheBook({ user, bookid, setShowPopup }) {
  // purpose is to updating user data
  async function onUpdate({ updatedUser }) {
    try {
      // adding book to addcart list
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

  // purpose is to add book to cart
  const rentBook = () => {
    setShowPopup(false);
    const updatedUser = {
      ...user,
      rentbooks: [...(user.rentbooks || []), bookid], // Ensure adCartBooks is initialized as an array
    };
    onUpdate({ updatedUser });
  };

  return <button onClick={rentBook}>Rent</button>;
}
