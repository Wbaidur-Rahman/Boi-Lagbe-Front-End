import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";

import Notifications from "../components/Notifications";
import RentRequests from "../components/RentRequests";
import Rents from "../components/Rents";

const apiUrl = import.meta.env.VITE_API_URL;

export default function InfoPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const infotype = queryParams.get("type");

  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    if (!userid) {
      HandleUser();
    }
    async function HandleUser() {
      try {
        const response = await axios.get(`${apiUrl}/users?id=${userid}`);
        setUser(response.data.user);
        setUserId(response.data.user._id);
      } catch (error) {
        console.log(error.response.data.errors);
        navigate("/login");
      }
    }
  }, [userid]);

  return (
    <div>
      <ToastContainer />
      <Layout>
        <div style={{ display: "flex" }}></div>
        <div style={{ display: "flex", marginRight: 50 }}>
          {user && (
            <Link
              to="/user"
              className="nav-link"
              style={{ margin: 10, paddingRight: 10 }}
            >
              Profile
            </Link>
          )}
          {user && (
            <Link
              to="/"
              className="nav-link"
              style={{ margin: 10, paddingRight: 10 }}
            >
              Home
            </Link>
          )}
        </div>
      </Layout>
      <div style={{ marginTop: 100 }} />
      {infotype === "request" && <RentRequests user={user} />}
      {infotype === "notify" && <Notifications user={user} />}
      {infotype === "rent" && <Rents user={user} />}
    </div>
  );
}
