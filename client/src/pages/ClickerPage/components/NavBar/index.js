import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hideExtraSymbols } from "../../../../utils/formatters";
import socket from "../../../../utils/socket";
import "./styles.scss";

const SpookyNavBar = ({ roomId, id, clicksLeft }) => {
  socket.emit("getRoomUsers", roomId);
  const [activeUsers, setActiveUsers] = useState(1);

  useEffect(() => {
    socket.on("updateActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, []);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <span>Room id: {hideExtraSymbols(id)}</span>
          </li>
          <li>
            <span>Clicks left: {clicksLeft}</span>
          </li>
          <li>
            <span>Users in room: {activeUsers}</span>
          </li>
        </ul>
      </nav>

      <Link to={"/"} className="header-logo-container">
        Spooky Clicker
      </Link>
      <p className="tagline">Click on monsters to defeat them</p>
    </header>
  );
};

export default SpookyNavBar;
