import { Link } from "react-router-dom";
import "./styles.scss";

const SpookyNavBar = () => {
  return (
    <header className="header-home-page">
      <Link to={"/"} className="header-logo-container">
        Spooky Clicker
      </Link>
      <p className="tagline">Click on monsters to defeat them</p>
    </header>
  );
};

export default SpookyNavBar;
