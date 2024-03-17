import React from "react";
import { List } from "react-bootstrap-icons";
import { NavLink, useLocation } from "react-router-dom";
import UserAvatar from "../assets/images/userAvatar.png";
import HomePageBody from "../components/HomePageBody";
import Layout from "../components/Layout";
import NavDropDown from "../components/NavDropDown";
import NavSearchBar from "../components/NavSearchBar";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const location = useLocation();

  const user = location.state;

  return (
    <>
      <Layout>
        <div>
          <NavDropDown id="nav-dropdown" title={"Category"} />
        </div>
        <div id="navbar-right">
          <NavSearchBar />
          {user ? (
            <NavLink to={`/user?id=${user._id}`} className="nav-link">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {user.avatar ? (
                  <img
                    src={`${apiUrl}/users/avatar/${user.avatar}`}
                    alt="userAvatar"
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                ) : (
                  <img
                    src={UserAvatar}
                    alt="UserAvatar"
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 10,
                      boxSizing: "border-box",
                      borderRadius: 50,
                    }}
                  />
                )}
              </div>
              <h6>MyProfile</h6>
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup" className="nav-link">
                signup
              </NavLink>
              <NavLink to="/login" className="nav-link">
                login
              </NavLink>
            </>
          )}
          <NavDropDown title={<List style={{ fontSize: 25 }} />} />
        </div>
      </Layout>
      <div style={{ marginTop: 97 }} />
      <HomePageBody />
    </>
  );
}
