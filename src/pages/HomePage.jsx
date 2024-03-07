import { List } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import NavDropDown from "../components/NavDropDown";
import NavSearchBar from "../components/NavSearchBar";

import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div>
        <NavDropDown id="nav-dropdown" title={"Category"} />
      </div>
      <div id="navbar-right">
        <NavSearchBar />
        <NavLink to="/signup" className="nav-link">
          signup
        </NavLink>
        <NavLink to="/login" className="nav-link">
          login
        </NavLink>
        <NavDropDown title={<List style={{ fontSize: 25 }} />} />
      </div>
    </Layout>
  );
}
