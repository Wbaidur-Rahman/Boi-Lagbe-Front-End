import logo from "../assets/images/logo.png";

function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <span style={{ color: "darkblue" }}>Boi Lagbe</span>
    </div>
  );
}

export default Logo;
