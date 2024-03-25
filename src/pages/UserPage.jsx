import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import UserPageBody from "../components/UserPageBody";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
  const navigate = useNavigate();
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
        <div></div>
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
            to={`/addbooks?id=${userid}`}
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
      <UserPageBody user={user} />
    </div>
  );
}
