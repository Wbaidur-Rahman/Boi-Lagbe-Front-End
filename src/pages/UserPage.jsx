import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import UserPageBody from "../components/UserPageBody";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
  // Extracting query parameters using useLocation hook
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userid = queryParams.get("id");

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
      }
    }
  }, [userid]);

  return (
    <div>
      <ToastContainer />
      <Layout>
        <div></div>
        <div style={{ display: "flex" }}>
          {user && (
            <Link
              to="/"
              state={user}
              className="nav-link"
              style={{ margin: 10, paddingRight: 30 }}
            >
              Home
            </Link>
          )}
          <Link
            to={`/addbooks?id=${userid}`}
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            AddBooks
          </Link>
        </div>
      </Layout>
      <div style={{ marginTop: 100 }} />
      <UserPageBody user={user} />
    </div>
  );
}
