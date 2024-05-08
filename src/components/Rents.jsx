/*
 * Title: Rent Document
 * Description: Rent info is showing here
 * Author: Wbaidur Rahman
 * Date: 1/2/2024
 *
 */

import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/InfoPageModule.css";
import notifyUser from "../utilities/notifyUser";

const apiUrl = import.meta.env.VITE_API_URL;

function Rent({ rent_id, onDelete }) {
  const [rent, setRent] = useState({});
  const [borrower, setBorrower] = useState(null);
  const [owner, setOwner] = useState(null);

  let lim = 0;
  useEffect(() => {
    if (rent_id && lim == 0) {
      handleRent();
      lim++;
    }

    // purpose is to getting all rent related data and notifying the borrower
    async function handleRent() {
      try {
        const response1 = await axios.get(`${apiUrl}/rents?id=${rent_id}`);
        setRent(response1.data.rent);

        const response2 = await axios.get(
          `${apiUrl}/users?id=${response1.data.rent.borrowerid}`
        );
        setBorrower(response2.data.user);

        const response3 = await axios.get(
          `${apiUrl}/users?id=${response1.data.rent.ownerid}`
        );
        setOwner(response3.data.user);

        // here i should notify the user(borrower) for giving back the rented book if end date is tomorrow
        if (
          !response1.data.rent.notified &&
          Date.now() >
            new Date(response1.data.rent.enddate).getTime() -
              1000 * 60 * 60 * 24 * 1
        ) {
          console.log("notifying user");
          const notification = {
            title: `Giving back ${response1.data.rent.booktitle}`,
            ownerid: response1.data.rent.borrowerid,
            message: `Your rented book ${response1.data.rent.booktitle} must be given back within ${response1.data.rent.enddate}`,
          };

          notifyUser(notification);
          await axios.put(`${apiUrl}/rents/${rent_id}`);
        }
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
  }, [rent_id]);

  // purpose is to delete a rent info from the agent and db
  async function deleteRent(id) {
    try {
      await axios.delete(`${apiUrl}/rents/${id}`);
      onDelete(id);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      {rent && (
        <div id="rent_card">
          {rent && (
            <p>
              Book: <span style={{ color: "darkred" }}>{rent.booktitle}</span>
            </p>
          )}
          {borrower && <p>Borrower Name: {borrower.name}</p>}
          {borrower && (
            <p>
              {" "}
              Borrower Address:
              <span style={{ color: "darkred" }}> {borrower.address}</span>
            </p>
          )}
          {rent && <p>Borrower Phone: {rent.borrowerphone}</p>}
          {owner && <p>Owner Name: {owner.name}</p>}
          {owner && (
            <p>
              Owner Address:{" "}
              <span style={{ color: "darkred" }}> {owner.address}</span>
            </p>
          )}
          {rent && <p>Owner Phone: {rent.ownerphone}</p>}
          {rent && <p>Duration: {rent.duration} Days</p>}
          {rent && <p>Cost: {rent.cost} taka</p>}
          {rent && <p>Start Date: {rent.startdate}</p>}
          {rent && <p>End Date: {rent.enddate}</p>}
          <br />
          <button
            onClick={() => deleteRent(rent._id)}
            style={{
              color: "red",
              padding: 3,
              borderRadius: 10,
              float: "right",
            }}
          >
            Book Received
          </button>
        </div>
      )}
    </>
  );
}

export default function Rents({ user }) {
  const [rents, setRents] = useState(null);

  useEffect(() => {
    if (user) {
      setRents(user.rents);
    }
  }, [user]);

  function handleDelete(id) {
    setRents(rents.filter((rent_id) => rent_id !== id));
  }
  return (
    <div>
      <div id="rent_container">
        {rents && rents.length === 0 && <h2>Opps..., No Rents Found</h2>}
        {rents && rents.length > 0 && <h2>Rents</h2>}
      </div>
      <div id="rent_container">
        {rents &&
          rents
            .slice()
            .reverse()
            .map((rent_id) => (
              <Rent key={rent_id} rent_id={rent_id} onDelete={handleDelete} />
            ))}
      </div>
    </div>
  );
}
