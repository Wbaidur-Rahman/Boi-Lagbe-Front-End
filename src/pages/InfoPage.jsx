import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";

import Notifications from "../components/Notifications";
import RentRequests from "../components/RentRequests";

const apiUrl = import.meta.env.VITE_API_URL;

export default function InfoPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userid = queryParams.get("id");
  const infotype = queryParams.get("type");

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userid) {
      HandleUser();
    }
    async function HandleUser() {
      try {
        const response = await axios.get(`${apiUrl}/users?id=${userid}`);
        setUser(response.data.user);
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
              to="/"
              state={user}
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
    </div>
  );
}
