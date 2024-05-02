/*
 * Title: Renting a book
 * Description: Renting actions is performed here
 * Author: Wbaidur Rahman
 * Date: 28/3/2024
 *
 */

import { useState } from "react";
import "../styles/UserPageBodyModule.css";
import sendRentRequest from "../utilities/sendRentRequest";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RentTheBook({ user, book, setShowPopup }) {
  const [rentPopup, setRentPopup] = useState(false);
  const [duration, setDuration] = useState(null);
  const [durationError, setDurationError] = useState(null);
  const [phone, setPhone] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [cost, setCost] = useState(0);
  const [tag, setTag] = useState({});
  const price = Number(book.data.price);

  // sending the rent request
  async function handleSendRequest() {
    if (Number(duration) > 21 || Number(duration) < 3) {
      setDurationError("Duration Must be 3 to 21 Days");
      return;
    }
    try {
      await sendRentRequest({ book, tag, duration, cost, user, phone });
      setShowPopup(false);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors.borrowerphone) setPhoneError(errors.borrowerphone.msg);
      if (errors.duration) setDurationError(errors.duration.msg);
    }
  }

  // Checking if a book is available for rent
  const checkAvailability = () => {
    return book.tags.find((tag) => tag.isAvailable === true);
  };

  // Showing the popup window
  const togglePopup = () => {
    setRentPopup(!rentPopup);
  };

  // Update cost when duration changes
  const handleDurationChange = (e) => {
    setDurationError("");
    const newDuration = e.target.value;
    setDuration(newDuration);
    setCost(Math.ceil(Number(newDuration) * (price / 100)));
    setTag(checkAvailability());
  };

  return (
    <>
      <button
        onClick={togglePopup}
        style={{
          padding: 5,
          margin: 5,
          color: "green",
          backgroundColor: "lightyellow",
        }}
      >
        Rent
      </button>

      {rentPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <img
              src={`${apiUrl}/books/book-covers/${book.cover}`}
              alt="bookCover"
            />
            <p>Title: {book.title}</p>
            <p>Author: {book.data.author}</p>
            <p>Price: {price}</p>
            <p>
              Is Available:{" "}
              {checkAvailability() ? "Available" : "Not Available"}
            </p>
            <br />
            <p>Rent Duration on days: </p>
            <input
              type="number"
              placeholder="Enter days for rent"
              value={duration}
              onChange={handleDurationChange}
              style={{ padding: 3 }}
            />
            <br />
            {durationError && (
              <p style={{ color: "red", padding: 3 }}>{durationError}</p>
            )}
            <p>Cost: {cost} taka</p>
            <p>Enter phone number: </p>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
              style={{ padding: 3 }}
            />
            {phoneError && (
              <p style={{ color: "red", padding: 3, width: 300 }}>
                {phoneError}
              </p>
            )}
            <br />
            <br />
            <button
              onClick={() => handleSendRequest()}
              style={{
                padding: 5,
                margin: 5,
                color: "green",
                backgroundColor: "lightyellow",
              }}
            >
              Request for Rent
            </button>
          </div>
        </div>
      )}
    </>
  );
}
