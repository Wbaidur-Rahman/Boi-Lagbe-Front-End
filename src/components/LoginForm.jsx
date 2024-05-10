import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory to redirect after successful login
import LoginUser from "../assets/images/LoginUser.png";

const apiUrl = import.meta.env.VITE_API_URL;

import { useDispatch } from "react-redux";
import { setuser } from "../features/users/usersSlice";
import "../styles/LoginModule.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate(); // Initialize useHistory hook
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const formData = {
      email: email,
      password: password,
    };

    // setting the redux user

    // Make an HTTP POST request to your server endpoint
    axios
      .post(`${apiUrl}/login`, formData)
      .then((response) => {
        dispatch(setuser(response.data.userObject));

        // Redirect to the desired page after successful login
        navigate(`/user`);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        const errors = error.response.data.errors;
        setLoginError(
          errors.email
            ? errors.email.msg
            : errors.password
            ? errors.password.msg
            : errors.common.msg
        );
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
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError("");
            }}
          />
        </ul>
        <ul style={{ flexDirection: "column" }}>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value), setLoginError("");
            }}
          />
          <span style={{ color: "red" }}>{loginError}</span>
        </ul>
        <ul>
          <button type="submit">Login</button>
        </ul>
      </form>
    </div>
  );
}
