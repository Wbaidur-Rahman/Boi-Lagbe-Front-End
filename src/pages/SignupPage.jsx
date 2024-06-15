import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import SignupBody from "../components/SignupBody";

const apiUrl = import.meta.env.VITE_API_URL;

export default function SignupPage() {
  const [userid, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userid) getUser();

    async function getUser() {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUserId(response.data.user._id);
        navigate("/user");
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
  }, [userid]);

  return (
    <>
      <Layout>
        <div></div>
        <div style={{ display: "flex" }}>
          <NavLink
            to="/"
            className="nav-link"
            style={{ marginRight: 20, marginTop: 10 }}
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className="nav-link"
            style={{ marginRight: 50, marginTop: 10 }}
          >
            Login
          </NavLink>
        </div>
      </Layout>
      <SignupBody />
    </>
  );
}
