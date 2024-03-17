import { NavLink } from "react-router-dom";
import BookSubmitForm from "../components/BookSubmitForm";
import Layout from "../components/Layout";

export default function AddBooksPage() {
  return (
    <>
      <Layout>
        <div></div>
        <div>
          <NavLink
            to="/addbooks"
            className="nav-link"
            style={{ margin: 10, paddingRight: 30 }}
          >
            AddBooksPage
          </NavLink>
        </div>
      </Layout>
      <div style={{ marginTop: 97 }} />
      <BookSubmitForm />
    </>
  );
}
