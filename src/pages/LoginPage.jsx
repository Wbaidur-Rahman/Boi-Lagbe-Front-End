import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

export default function SignupPage() {
  return (
    <>
      <Layout>
        <div></div>
        <div style={{ display: "flex" }}>
          <NavLink
            to="/"
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            Home
          </NavLink>
          <NavLink
            to="/signup"
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            SignUp
          </NavLink>
        </div>
      </Layout>
      <LoginForm />
    </>
  );
}
