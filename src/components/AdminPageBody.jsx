import axios from "axios";
import { useState } from "react";
import CreateWarhouseForm from "./CreateWarhouseForm";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminPageBody() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  // purpose is to add an agent
  async function addAgent() {
    const userData = {
      email: email,
      role: "agent",
      mobile: mobile,
    };
    try {
      const response = await axios.post(`${apiUrl}/admin/`, userData);
      console.log(response.data);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors.email) setEmailError(errors.email.msg);
      if (errors.mobile) setMobileError(errors.mobile.msg);

      console.log(errors);
    }
  }

  // purpose is to remove an agent
  async function removeAgent() {
    try {
      const response = await axios.delete(`${apiUrl}/admin/${email}`);
      console.log(response.data);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors.email) setEmailError(errors.email.msg);
      if (errors.mobile) setMobileError(errors.mobile.msg);

      console.log(errors);
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div>
      <ul>
        <h2 style={{ marginTop: 150 }}>Admin Page</h2>
      </ul>
      <div>
        <div style={{ height: "300px" }} className="container">
          <form>
            <ul>
              <h2>Add an Agent</h2>
            </ul>
            <ul>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter agent mail"
                style={{ marginTop: 10, color: "darkred" }}
              />
              {emailError && (
                <p style={{ color: "red", paddingTop: 8, paddingBottom: 10 }}>
                  {emailError}
                </p>
              )}
            </ul>
            <ul>
              Mobile:
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter agent mobile"
                style={{ color: "darkred" }}
              />
              {mobileError && (
                <p style={{ color: "red", paddingTop: 8, paddingBottom: 10 }}>
                  {mobileError}
                </p>
              )}
            </ul>
            <div id="profileupdate">
              <button onClick={() => addAgent()}>Add Agent</button>
              <button style={{ marginLeft: 20 }} onClick={() => removeAgent()}>
                Remove Agent
              </button>
            </div>
          </form>
        </div>

        <div className="container">
          <CreateWarhouseForm />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
