import logo from "../assets/images/logo.png";

function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <a href="http://localhost:5173/" style={{ color: "darkblue" }}>
        Boi Lagbe
      </a>
      {/* <span style={{ color: "darkblue" }}>Boi Lagbe</span> */}
    </div>
  );
}

export default Logo;
