import "../styles/NavBar.css";
import Logo from "./Logo";

export default function Layout({ children }) {
  return (
    <>
      <div className="nav">
        <div id="navbar-left">
          <Logo />
          {children[0]}
        </div>
        {children[1]}
      </div>
    </>
  );
}
