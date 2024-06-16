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

  let lim = 0;
  useEffect(() => {
    if (rent_id && lim == 0) {
      handleRent();
      lim++;
    }

    // purpose is to getting all rent related data and notifying the borrower
    async function handleRent() {
      try {
        const response = await axios.get(`${apiUrl}/rents?id=${rent_id}`);
        setRent(response.data.rent);

        // here i should notify the user(borrower) for giving back the rented book if end date is tomorrow
        if (
          !response.data.rent.notified &&
          Date.now() >
            new Date(response.data.rent.enddate).getTime() -
              1000 * 60 * 60 * 24 * 1
        ) {
          console.log("notifying user");
          const notification = {
            title: `Giving back ${response.data.rent.booktitle}`,
            ownerid: response.data.rent.borrowerid,
            message: `Your rented book ${response.data.rent.booktitle} must be given back within ${response.data.rent.enddate}`,
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
    <div style={{ paddingLeft: "5px" }}>
      {rent && (
        <table className="table" style={{ width: "750px" }}>
          <thead>
            <tr>
              <th scope="col">
                <h3>
                  Book Title: <b>{rent.booktitle}</b>
                </h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Payment Status: Unpaid</th>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <th>
                <table className="table">
                  <thead>
                    <th>
                      {/* table for owner information */}
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">
                              <h5>Owner Information</h5>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Name: {rent.owner_name}</td>
                          </tr>
                          <tr>
                            <td>Phone: {rent.ownerphone}</td>
                          </tr>
                          <tr>
                            <td>Address: {rent.owner_address}</td>
                          </tr>
                        </tbody>
                      </table>
                    </th>
                    <th>
                      {/* table for borrower information */}
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">
                              <h5>Borrower Information</h5>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Name: {rent.borrower_name}</td>
                          </tr>
                          <tr>
                            <td>Phone: {rent.borrowerphone}</td>
                          </tr>
                          <tr>
                            <td>Address: {rent.borrower_address}</td>
                          </tr>
                        </tbody>
                      </table>
                    </th>
                  </thead>
                </table>
              </th>
            </tr>
            <tr>
              <table className="table">
                <thead>
                  <tr>
                    <th>Start Date: {rent.startdate}</th>
                  </tr>
                  <tr>
                    <th>End Date: {rent.enddate}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
          </tbody>
          <br />
        </table>
      )}
    </div>
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
