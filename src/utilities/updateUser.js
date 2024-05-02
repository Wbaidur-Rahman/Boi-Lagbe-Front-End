import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export async function onUpdate({ user, updatedUser }) {
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
    throw error; // Re-throwing the error for handling in the caller module
  }
}

export default { onUpdate };
