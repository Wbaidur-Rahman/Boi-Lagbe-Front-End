import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default async function sendRentRequest({ book, tag, duration, cost, user1, phone }) {
    const rentrequest = {
        title: book.title,
        bookid: book._id,
        duration,
        borrowerid: user1._id,
        amount: cost,
        ownerid: tag.ownerid,
        borrowerphone: phone,
    }
  try {
    // rent request is generated and sent to owner
    await axios.post(
      `${apiUrl}/rentrequest/`,
      rentrequest
    );
    
  } catch (error) {
    console.log(error.response.data);
    throw error; // Re-throwing the error for handling in the caller module
  }
}

