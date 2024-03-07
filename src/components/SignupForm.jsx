import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserIcon from "../assets/images/createAccountIcon.png";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkForPassword, setCheckForPassword] = useState(false);
  const [agreed, setAgreed] = useState(false); // State variable for checkbox

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // checking for password and confirm password
    if (password !== confirmPassword) {
      setCheckForPassword(true);
      return;
    }

    // Checking if the checkbox is checked
    if (!agreed) {
      // If not checked, display error message
      toast.error("Please agree to the terms and conditions", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    setCheckForPassword(false);

    const formData = {
      name: name,
      email: email,
      password: password,
    };

    // Make an HTTP POST request to your server endpoint
    axios
      .post("http://localhost:5000/users", formData)
      .then((response) => {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });

        // Clear form fields (optional)
        // setName("");
        // setEmail("");
        // setPassword("");
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        console.log(errors);

        if (errors.name) {
          setNameError(errors.name.msg);
        }
        if (errors.email) {
          setEmailError(errors.email.msg);
        }
        if (errors.password) {
          setPasswordError(errors.password.msg);
        }
      });
  }

  // Function to handle checkbox change
  function handleCheckboxChange() {
    setAgreed(!agreed);
  }

  return (
    <>
      <ToastContainer />
      <form id="form" onSubmit={handleSubmit}>
        <ul style={{ flexDirection: "row" }}>
          <img src={AddUserIcon} alt="User Icon" />
        </ul>
        <ul>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
          />
          {nameError && <span>{nameError}</span>}
        </ul>
        <ul>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <span>{emailError}</span>}
        </ul>
        <ul>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
          {passwordError && <span>{passwordError}</span>}
        </ul>
        <ul>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {checkForPassword && <span>Please check your password</span>}
        </ul>
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleCheckboxChange}
          />
          <span>I agree to the terms and conditions</span>
        </label>
        {!agreed && (
          <ul>
            <span>Please agree to the terms and conditions</span>
          </ul>
        )}
        <ul>
          <button type="submit">Submit</button>
        </ul>
        <ul>
          <h6>
            Already have an account? <Link to="/login">Login</Link> instead.
          </h6>
        </ul>
      </form>
    </>
  );
}
