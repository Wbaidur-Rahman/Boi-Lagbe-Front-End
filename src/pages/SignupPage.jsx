import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import SignupBody from "../components/SignupBody";

export default function SignupPage() {
  return (
    <>
      <Layout>
        <div></div>
        <div style={{ display: "flex" }}>
          <NavLink
            to="/"
            className="nav-link"
            style={{ marginRight: 20, marginTop: 10 }}
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className="nav-link"
            style={{ marginRight: 50, marginTop: 10 }}
          >
            Login
          </NavLink>
        </div>
      </Layout>
      <SignupBody />
    </>
  );
}
