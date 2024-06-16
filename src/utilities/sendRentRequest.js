import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default async function sendRentRequest({ book, tag, duration, cost, user1, phone }) {
    const rentrequest = {
        title: book.title,
        bookid: book._id,
        duration,
        borrowerid: user1._id,
        borrower_name: user1.name,
        borrower_email: user1.email,
        borrower_address: user1.address,
        borrowerphone: phone,
        amount: cost,
        ownerid: tag.ownerid,
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

