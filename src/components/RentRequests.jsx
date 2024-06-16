import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/InfoPageModule.css";

import { rejectRentReq } from "../utilities/rentRequestHandler";
import GetOwnerPhone from "./GetOwnerPhone";

const apiUrl = import.meta.env.VITE_API_URL;

// Displaying each rent requests
function RentRequest({ rentreq_id, user, onDelete }) {
  const [rentreq, setRentreq] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (rentreq_id) {
      handleRentreq();
    }

    async function handleRentreq() {
      try {
        const response = await axios.get(
          `${apiUrl}/rentrequest?id=${rentreq_id}`
        );
        setRentreq(response.data.rentrequest);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
  }, [rentreq_id]);

  const handleReject = () => {
    rejectRentReq({ rentreq, user });
    onDelete(rentreq_id);
  };

  return (
    <div id="rentreq_card">
      <div style={{ marginLeft: 10 }}>
        <p>Title: {rentreq.title}</p>
        <p>Duration: {rentreq.duration}</p>
        <p>Amount: {rentreq.amount}</p>
      </div>
      <div>
        {show && (
          <GetOwnerPhone
            user={user}
            rentreq={rentreq}
            setShow={setShow}
            rentreq_id={rentreq_id}
            onDelete={onDelete}
          />
        )}
        {!show && <button onClick={() => setShow(true)}>Accept</button>}
        {!show && (
          <button onClick={handleReject} style={{ color: "red" }}>
            Reject
          </button>
        )}
      </div>
    </div>
  );
}

// here i am fetching the rentreqs of corresponding user
export default function RentRequests({ user }) {
  const [rentreqs, setRentreqs] = useState(null);

  useEffect(() => {
    if (user) {
      setRentreqs(user.rentrequests);
    }
  }, [user]);

  function handleDelete(id) {
    setRentreqs(rentreqs.filter((rent_id) => rent_id !== id));
  }

  return (
    <div>
      <div id="rentreq_container">
        {rentreqs && rentreqs.length === 0 && <h2>No Rent Request Found</h2>}
        {rentreqs && rentreqs.length > 0 && <h2>Rent Requests</h2>}
      </div>
      <div id="rentreq_container">
        {rentreqs &&
          rentreqs.map((rentreq_id) => (
            <RentRequest
              key={rentreq_id}
              rentreq_id={rentreq_id}
              user={user}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}
