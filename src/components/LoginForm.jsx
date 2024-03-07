import axios from "axios";
import { useState } from "react";
import LoginUser from "../assets/images/LoginUser.png";

import "../styles/LoginModule.css";

export default function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const formData = {
      email: email,
      password: password,
    };

    // Make an HTTP POST request to your server endpoint
    axios
      .get("http://localhost:5000/users", formData)
      .then((response) => {
        console.log("Form data submitted successfully:", response.data);
        // Optionally, you can handle success response here (e.g., show a success message)
      })
      .catch((error) => {
        console.log(error);
        // console.error("Error submitting form data:", error);
        // Optionally, you can handle error response here (e.g., show an error message)
      });
  };
  return (
    <div className="container">
      <form id="form" onSubmit={handleLogin}>
        <ul>
          <img src={LoginUser} alt="LoginUserImage" />
        </ul>
        <ul>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ul>
        <ul>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ul>
        <ul>
          <button type="submit">Login</button>
        </ul>
      </form>
    </div>
  );
}
