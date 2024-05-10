import { NavLink } from "react-router-dom";
import BookSubmitForm from "../components/BookSubmitForm";
import Layout from "../components/Layout";

export default function AddBooksPage() {
  return (
    <>
      <Layout>
        <div></div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <NavLink
            to="/user"
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            Profile
          </NavLink>
          <NavLink
            to="/"
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            Home
          </NavLink>
        </div>
      </Layout>
      <div style={{ marginTop: 97 }} />
      <BookSubmitForm />
    </>
  );
}
