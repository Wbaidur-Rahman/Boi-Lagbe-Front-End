import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPageBody from "../components/AdminPageBody";
import Layout from "../components/Layout";
import UserPageBody from "../components/UserPageBody";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    if (!userid) getUser();

    async function getUser() {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUser(response.data.user);
        setUserId(response.data.user._id);
      } catch (error) {
        console.log(error.response.data.errors);
        navigate("/login");
      }
    }
  }, [userid]);

  // Logout function to handle logout and redirect to home page
  const handleLogout = async () => {
    try {
      await axios.get(`${apiUrl}/users/logout`);
      // Optionally perform any client-side cleanup or redirect here
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle errors if necessary
    }
  };

  return (
    <div>
      <ToastContainer />
      <Layout>
        <div style={{ display: "flex" }}>
          <Link
            to={`/info?type=request`}
            className="nav-link"
            style={{ margin: 10, paddingRight: 10 }}
          >
            RentReqs
          </Link>
          <Link
            to={`/info?type=notify`}
            className="nav-link"
            style={{ margin: 10, paddingRight: 10 }}
          >
            Notifications
          </Link>

          {user && user.role === "agent" && (
            <Link
              to={`/info?type=rent`}
              className="nav-link"
              style={{ margin: 10, paddingRight: 10 }}
            >
              Rents
            </Link>
          )}
        </div>
        <div style={{ display: "flex" }}>
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
          <Link
            to={`/addbooks`}
            className="nav-link"
            style={{ margin: 10, paddingRight: 10 }}
          >
            AddBooks
          </Link>
          <button
            className="nav-link"
            style={{
              height: "fit-content",
              width: "fit-content",
              paddingTop: 20,
              marginRight: 30,
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </Layout>
      <div style={{ marginTop: 100 }} />
      {user && user.role !== "admin" && <UserPageBody user={user} />}
      {user && user.role === "admin" && <AdminPageBody user={user} />}
    </div>
  );
}
