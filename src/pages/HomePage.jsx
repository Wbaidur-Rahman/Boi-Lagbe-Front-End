import axios from "axios";
import { useEffect, useState } from "react";
import { List } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import UserAvatar from "../assets/images/userAvatar.png";
import HomePageBody from "../components/HomePageBody";
import Layout from "../components/Layout";
import NavDropDown from "../components/NavDropDown";
import NavSearchBar from "../components/NavSearchBar";

import "../styles/Homepage.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) HandleUser();

    async function HandleUser() {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    }
  });

  return (
    <>
      <Layout>
        <div>
          <NavDropDown id="nav-dropdown" title={"Category"} />
        </div>
        <div id="navbar-right">
          <NavSearchBar />
          {user ? (
            <NavLink to={`/user`} className="nav-link">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {user.avatar ? (
                  <img
                    src={`${apiUrl}/users/avatar/${user.avatar}`}
                    alt="userAvatar"
                    style={{
                      width: 40,
                      height: 40,
                      marginTop: "10px",
                      marginRight: 10,
                      borderRadius: "50px",
                    }}
                  />
                ) : (
                  <img
                    src={UserAvatar}
                    alt="UserAvatar"
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: "10px",
                      marginRight: 10,
                      boxSizing: "border-box",
                      borderRadius: 50,
                    }}
                  />
                )}
              </div>
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup" className="nav-link">
                SignUp
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          )}
          <NavDropDown title={<List style={{ fontSize: 25 }} />} />
        </div>
      </Layout>
      <div style={{ marginTop: 97 }} />
      <HomePageBody user={user} />
    </>
  );
}
