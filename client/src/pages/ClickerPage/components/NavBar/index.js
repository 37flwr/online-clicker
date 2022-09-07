import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CopyIcon } from "../../../../assets/CopyIcon.svg";
import CopyButton from "../../../../components/Buttons/CopyButton";
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
            Room id: {hideExtraSymbols(id)}
            <CopyButton
              width="18px"
              height="18px"
              marginLeft="5px"
              onClick={() => navigator.clipboard.writeText(window.location)}
            >
              <CopyIcon />
            </CopyButton>
          </li>
          <li>Clicks left: {clicksLeft}</li>
          <li>Users in room: {activeUsers}</li>
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
