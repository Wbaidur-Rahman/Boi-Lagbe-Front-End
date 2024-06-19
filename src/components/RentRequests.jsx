/*
 * Title: RentRequest
 * Description: This Component is to render all the rent requests of a user and manage them
 * Author: Wbaidur Rahman
 * Date: 18/6/2024
 *
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/InfoPageModule.css";

const apiUrl = import.meta.env.VITE_API_URL;

// rendering each rent request as a single row
function RentRequest({ index, rentreq_id, onSelect }) {
  const [rentreq, setRentreq] = useState({});

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

  async function handleAccept() {
    try {
      await axios.post(`${apiUrl}/rentrequest/accept`, rentreq);
      onSelect(rentreq_id);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function handleCancel() {
    try {
      await axios.post(`${apiUrl}/rentrequest/cancel`, rentreq);
      onSelect(rentreq_id);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      {rentreq && (
        <tr>
          <td>{Number(index) + 1}</td>
          <td>{rentreq.title}</td>
          <td>{rentreq.author}</td>
          <td>{rentreq.duration}</td>
          <td>{rentreq.amount}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => handleAccept()}
              style={{ margin: "0px 3px 2px 0px" }}
            >
              Book Received
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleCancel()}
              style={{ margin: "0px 3px 2px 0px" }}
            >
              Cancel Order
            </Button>
          </td>
        </tr>
      )}
    </>
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
    <div
      id="rent_container"
      style={
        {
          /*width: "90%", margin: "auto", minWidth: "500px" */
        }
      }
    >
      {rentreqs && rentreqs.length > 0 && <h2>Rent Requests</h2>}
      {rentreqs && rentreqs.length === 0 && <h2>No Rent Requests Found</h2>}

      {rentreqs && rentreqs.length > 0 && (
        <div style={{ width: "90%" }}>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Duration</th>
                <th>Cost</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              {rentreqs.map((rentreq_id, index) => (
                <RentRequest
                  key={rentreq_id}
                  index={index}
                  rentreq_id={rentreq_id}
                  onSelect={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
