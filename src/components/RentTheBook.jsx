/*
 * Title: Renting a book
 * Description: Renting actions is performed here like sending rent requests
 * Author: Wbaidur Rahman
 * Date: 28/3/2024
 *
 */

import axios from "axios";
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
  const [limit, setLimit] = useState("");
  const price = Number(book.data.price);

  // sending the rent request
  async function handleSendRequest() {
    const response = await axios.get(`${apiUrl}/users?id=${user._id}`);
    const user1 = response.data.user;

    if (Number(duration) > 21 || Number(duration) < 3) {
      setDurationError("Duration Must be 3 to 21 Days");
      return;
    }
    if (Number(user1.collateral) < 100) {
      if (user1.rentbooks.length > 0) {
        setLimit("FreeCollateralLimitCrossed");
        console.log(user1.rentbooks);
        return;
      }
      if (user1.sentreqs.length > 0) {
        setPhoneError("You have already sent a request");
        return;
      }
    } else {
      if (user1.rentbooks.length > 2) {
        setPhoneError("You can only rent at most three books");
        return;
      }
      if (user1.sentreqs.length > 0 && user1.rentbooks.length > 1) {
        setPhoneError("You have already reached request limits");
        return;
      }
      if (user1.sentreqs.length > 1 && user1.rentbooks.length > 0) {
        setPhoneError("You have already reached request limits");
        return;
      }
    }

    if (!tag) {
      setPhoneError(
        "Sorry, The book is not available, please check again later"
      );
      return;
    }
    try {
      await sendRentRequest({ book, tag, duration, cost, user1, phone });
      setShowPopup(false);
    } catch (error) {
      console.log(error);
      const errors = error.response ? error.response.data.errors : {};
      if (errors.borrowerphone) setPhoneError(errors.borrowerphone.msg);
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
            {limit == "FreeCollateralLimitCrossed" && (
              <div
                style={{
                  width: "300px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <p style={{ color: "red" }}>
                  You have already rented 2 books so You should pay 100 taka as
                  Collateral first
                </p>
                <button style={{ padding: "3px" }}>Pay Collateral</button>
              </div>
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
