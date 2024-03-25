import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export default function addCartBook({ user, bookid, setShowPopup }) {
  // purpose is to updating user data
  // console.log(user);
  async function onUpdate({ updatedUser }) {
    try {
      // adding book to addcart list
      const response = await axios.put(
        `${apiUrl}/users/${user._id}`,
        updatedUser
      );

      // console.log(response.data);

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
  const addCartUserBook = () => {
    setShowPopup(false);
    // console.log(bookid);
    const updatedUser = {
      ...user,
      adcartbooks: [...(user.adcartbooks || []), bookid], // Ensure adCartBooks is initialized as an array
    };
    onUpdate({ updatedUser });
  };

  return <button onClick={addCartUserBook}>Add to Cart</button>;
}
