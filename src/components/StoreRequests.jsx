import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/InfoPageModule.css";

const apiUrl = import.meta.env.VITE_API_URL;

// Displaying each rent requests
function BookInfo({ storeReq, index, isSelected, onSelect }) {
  return (
    <>
      {storeReq && (
        <tr>
          <td>{Number(index) + 1}</td>
          <td>{storeReq.title}</td>
          <td>{storeReq.author}</td>
          <td>{storeReq.owner}</td>
          <td>{storeReq.address}</td>
          <td>{storeReq.mobile}</td>
          <td>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(storeReq.bookid, storeReq.ownerid)}
            />
          </td>
        </tr>
      )}
    </>
  );
}

// here i am fetching the store requests from the store
export default function StoreRequests({ user }) {
  const [storeReqs, setStoreReqs] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (!storeReqs) getStoreReqs();

    async function getStoreReqs() {
      try {
        const response = await axios.get(`${apiUrl}/admin/storereqs`);
        setStoreReqs(response.data.storereqs);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
  }, [user]);

  //   function handleRowSelect(bookid) {
  //     if (selectedRows.includes(bookid)) {
  //       setSelectedRows(selectedRows.filter((id) => id !== bookid));
  //     } else {
  //       setSelectedRows([...selectedRows, bookid]);
  //     }
  //   }

  function handleRowSelect(bookid, ownerid) {
    const isSelected = selectedRows.some((row) => row.bookid === bookid);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((row) => row.bookid !== bookid));
    } else {
      setSelectedRows([...selectedRows, { bookid, ownerid }]);
    }
  }

  //   async function handleAction() {
  //     const updatedStoreReqs = storeReqs.filter(
  //       (storeReq) => !selectedRows.includes(storeReq.bookid)
  //     );
  //     await axios.post(`${apiUrl}/admin/storereqs`, selectedRows);
  //     setStoreReqs(updatedStoreReqs);
  //     setSelectedRows([]);
  //   }

  async function handleAction() {
    const selectedBookIds = selectedRows.map((row) => row.bookid);
    await axios.post(`${apiUrl}/admin/storereqs`, selectedRows);
    const updatedStoreReqs = storeReqs.filter(
      (storeReq) => !selectedBookIds.includes(storeReq.bookid)
    );
    setStoreReqs(updatedStoreReqs);
    setSelectedRows([]);
  }

  return (
    <div style={{ width: "90%", margin: "auto", minWidth: "500px" }}>
      <h2 style={{}}>Store Requests</h2>
      {storeReqs && storeReqs.length === 0 && <h2>No Store Requests Found</h2>}

      {storeReqs && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Owner</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              {storeReqs.map((storeReq, index) => (
                <BookInfo
                  key={storeReq.bookid}
                  index={index}
                  storeReq={storeReq}
                  isSelected={selectedRows.some(
                    (row) => row.bookid === storeReq.bookid
                  )}
                  onSelect={handleRowSelect}
                />
              ))}
            </tbody>
          </table>
          <button className="button-primary" onClick={handleAction}>
            Book Stored
          </button>
        </div>
      )}
    </div>
  );
}
