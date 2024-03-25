import axios from "axios";
import { useEffect, useState } from "react";
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

  const [user, setUser] = useState(location.state);
  const [getCatagoryBooks, setGetCatagoryBooks] = useState(null);

  useEffect(() => {
    if (user && user.avatar) {
      HandleUser();
    }
    async function HandleUser() {
      try {
        await axios.get(`${apiUrl}/users/avatar/${user.avatar}`);
      } catch (error) {
        setUser(null);
      }
    }
  }, [user]);

  return (
    <>
      <Layout>
        <div>
          <NavDropDown
            id="nav-dropdown"
            title={"Category"}
            setGetCatagoryBooks={setGetCatagoryBooks}
          />
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
      <HomePageBody getCatagoryBooks={getCatagoryBooks} user={user} />
    </>
  );
}
