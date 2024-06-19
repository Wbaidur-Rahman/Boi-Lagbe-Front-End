/*
 * Title: Rent Document
 * Description: Rent info is showing here
 * Author: Wbaidur Rahman
 * Date: 1/2/2024
 *
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/InfoPageModule.css";
import notifyUser from "../utilities/notifyUser";

const apiUrl = import.meta.env.VITE_API_URL;

function Rent({ rent_id, onDelete }) {
  const [rent, setRent] = useState("");

  useEffect(() => {
    if (!rent) {
      getRentInfo();
    }

    // purpose is to getting all rent related data and notifying the borrower
    async function getRentInfo() {
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
          // to update the notified status of rent to true
          await axios.put(`${apiUrl}/rents/${rent_id}`);
        }
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
  }, [rent_id]);

  // purpose is to delete a rent info from the agent and db
  /*
   * removing the rent from agent
   * removing the book from borrower rentbooks list
   * the book is now available so update the tag of the book
   */
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
              <th>Status: {rent.status}</th>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table className="table">
                  <thead>
                    <tr>
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
                    </tr>
                  </thead>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Start Date: {rent.startdate}</th>
                    </tr>
                    <tr>
                      <th>End Date: {rent.enddate}</th>
                    </tr>
                  </thead>
                  {rent && rent.status === "accepted" && (
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
                  )}
                </table>
              </td>
            </tr>
          </tbody>
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

  // deleting the canceled request
  async function deleteCanceled() {
    try {
      const response = await axios.post(`${apiUrl}/rents/removecancelled`, {});
      const { rentids } = response.data;
      setRents(rents.filter((rent_id) => !rentids.includes(rent_id)));
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // removing rent from frontend
  function handleDelete(id) {
    setRents(rents.filter((rent_id) => rent_id !== id));
  }
  return (
    <div>
      {rents && rents.length > 0 && (
        <Button
          variant="danger"
          onClick={() => deleteCanceled()}
          style={{ marginLeft: "10%" }}
        >
          Delete Cancelled Rents
        </Button>
      )}
      <div id="rent_container">
        {rents && rents.length === 0 && <h2>No Rents Found</h2>}
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
