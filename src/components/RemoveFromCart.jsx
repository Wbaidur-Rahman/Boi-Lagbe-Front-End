import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RemoveFromCart({ user, bookid, setShowPopup }) {
  // purpose is to updating user data
  async function onUpdate({ updatedUser }) {
    try {
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
  const removeCartBook = () => {
    setShowPopup(false);
    const updatedUser = {
      ...user,
      adcartbooks: user.adcartbooks.filter((id) => id !== bookid),
    };
    onUpdate({ updatedUser });
  };

  return <button onClick={removeCartBook}>Remove from cart</button>;
}
