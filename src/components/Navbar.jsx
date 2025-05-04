import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">World Wander</h1>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => {
            const menu = document.getElementById("navbar-menu");
            menu.classList.toggle("active");
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-menu" id="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;