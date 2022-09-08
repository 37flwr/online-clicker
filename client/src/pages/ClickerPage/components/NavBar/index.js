import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import "./styles.scss";

const SpookyNavBar = ({ roomId, id, clicksLeft }) => {
  return (
    <header className="cp-header">
      <Navigation roomId={roomId} id={id} clicksLeft={clicksLeft} />
      <Link to={"/"} className="cp-header__logo">
        Spooky Clicker
      </Link>
      <p className="cp-header__tagline">Click on monsters to defeat them</p>
    </header>
  );
};

export default SpookyNavBar;
