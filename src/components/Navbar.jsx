import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import "../styles/Panel.css";
import soloLogo from "../assets/images/soloLogo.svg";
import menuIcon from "../assets/images/menu.svg";
import closeIcon from "../assets/images/close.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="header">
      <nav id="nav-menu">
        <div className="logo-cont">
          <img id="logo-img" src={soloLogo} alt="logo" />
          <h1>Risk Analysis</h1>
        </div>
        <div className="logo-menu" onClick={() => setMenuOpen(true)}>
          <img className="menu-icon" src={menuIcon} alt="menu" />
        </div>
        <div
          className={`logo-close ${menuOpen ? "" : "hid"}`}
          onClick={() => setMenuOpen(false)}
        >
          <img className="menu-icon" src={closeIcon} alt="close" />
        </div>
        <div className={`menu ${menuOpen ? "" : "hid"}`}>
          <div className="nav-links">
            <a href="#" className="nav-link home">
              Home
            </a>
            <a href="./pages/about.html" className="nav-link about">
              About
            </a>
            <a href="./pages/services.html" className="nav-link services">
              Services
            </a>
            <a href="./pages/contact.html" className="nav-link contact">
              Contact
            </a>
          </div>
          <button
            id="resume-button-1"
            className="login-signup"
            onClick={user ? handleLogout : () => navigate("/login")}
          >
            {user ? "Logout" : "Login/Signup"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
