import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export default async function sendRentRequest({ book, tag, duration, cost, user, phone }) {
    const rentrequest = {
        title: book.title,
        bookid: book._id,
        duration,
        borrowerid: user._id,
        amount: cost,
        ownerid: tag.ownerid,
        borrowerphone: phone,
    }
  try {
    // rent request is generated and sent to owner
    const response = await axios.post(
      `${apiUrl}/rentrequest/`,
      rentrequest
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

