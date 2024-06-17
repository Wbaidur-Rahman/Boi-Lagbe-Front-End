import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CreateWarhouseForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = {
      name: name,
      address: address,
      mobile: mobile,
    };

    // Make an HTTP POST request to your server endpoint
    axios
      .post(`${apiUrl}/admin/warhouse`, formData)
      .then((response) => {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
        });

        // Clear form fields (optional)
        setName("");
        setMobile("");
        setAddress("");
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        console.log(errors);
      });
  }

  return (
    <div>
      <ToastContainer />
      <form id="form" onSubmit={handleSubmit}>
        <ul>
          <h2>Add a warhouse</h2>
          <br />
        </ul>
        <ul>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </ul>
        <ul>
          <input
            type="mobile"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
        </ul>
        <ul>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </ul>
        <ul>
          <button type="submit">Submit</button>
        </ul>
      </form>
    </div>
  );
}
