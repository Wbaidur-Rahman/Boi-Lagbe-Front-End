import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

export default function SignupPage() {
  return (
    <>
      <Layout>
        <div></div>
        <NavLink
          to="/signup"
          className="nav-link"
          style={{ margin: 10, paddingRight: 30 }}
        >
          SignUp
        </NavLink>
      </Layout>
      <LoginForm />
    </>
  );
}
