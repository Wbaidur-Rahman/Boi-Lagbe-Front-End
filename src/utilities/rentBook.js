import axios from "axios";
import { toast } from "react-toastify";

import { onUpdateBook } from "./updateBook";
import { onUpdate } from "./updateUser";

const apiUrl = import.meta.env.VITE_API_URL;

// adding rent information to db
async function addRentInfo({ rentInfo }) {
    try {
      // adding book to addcart list
      const response = await axios.post(`${apiUrl}/rents`, rentInfo);

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

  // purpose is to add rent information to database
  export default async function rentBook({user, book, setShowPopup, duration}) {
    setShowPopup(false);
    const price = Number(book.data.price);

    const updatedBook = {
      ...book,
      isAvailable: false,
    };

    // setting the book is not available now
    onUpdateBook({ book, updatedBook });

    const rentInfo = {
      borrower: user._id,
      owner: book.ownerid,
      book: book._id,
      cost: Number(duration) * (price / 100),
      startdate: new Date().toISOString(), // Convert timestamp to date
      enddate: new Date(Date.now() + 24 * 3600000).toISOString(), // Convert timestamp to date
    };

    const updatedUser = {
      ...user,
      rentbooks: [...(user.rentbooks || []), book._id], // Ensure rentBooks is initialized as an array
      adcartbooks: user.adcartbooks.filter((id) => id !== book._id),
    };

    try {
      await addRentInfo({ rentInfo });
      await onUpdate({ user, updatedUser });
    } catch (error) {
      console.log(error);
    }
  }
