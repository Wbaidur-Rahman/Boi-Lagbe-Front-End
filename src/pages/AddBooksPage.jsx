import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BookSubmitForm from "../components/BookSubmitForm";
import Layout from "../components/Layout";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AddBooksPage() {
  const [userid, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userid) getUser();

    async function getUser() {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUserId(response.data.user._id);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) navigate("/login");
      }
    }
  }, [userid]);

  return (
    <>
      <Layout>
        <div></div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <NavLink
            to="/user"
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            Profile
          </NavLink>
          <NavLink
            to="/"
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            Home
          </NavLink>
        </div>
      </Layout>
      <div style={{ marginTop: 97 }} />
      <BookSubmitForm userid={userid} />
    </>
  );
}
