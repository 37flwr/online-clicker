import { useEffect, useState } from "react";
import { ReactComponent as CopyIcon } from "../../../../assets/icons/CopyIcon.svg";
import CopyButton from "../../../../components/Buttons/CopyButton";
import Toast from "../../../../components/Toast";
import { hideExtraSymbols } from "../../../../utils/formatters";
import socket from "../../../../utils/socket";

const Navigation = ({ roomId, id, clicksLeft }) => {
  socket.emit("getRoomUsers", roomId);
  const [activeUsers, setActiveUsers] = useState(1);
  const [copyAnimation, setCopyAnimation] = useState(false);

  useEffect(() => {
    socket.on("updateActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, []);

  const animateAndCopy = () => {
    setCopyAnimation(true);
    setTimeout(() => setCopyAnimation(false), 1500);
    navigator.clipboard.writeText(window.location);
  };

  return (
    <ul className="cp-header__navigation">
      <li className="cp-header__navigation__elem">Clicks left: {clicksLeft}</li>
      <li className="cp-header__navigation__elem">
        Room id: {hideExtraSymbols(id)}
        <CopyButton
          customClassName="cp-header__navigation__elem__copy-btn"
          onClick={animateAndCopy}
        >
          <CopyIcon />
        </CopyButton>
        {copyAnimation && (
          <Toast
            text="Copied to clipboard!"
            customClassName="cp-header__navigation__elem_clipboard-success"
          />
        )}
      </li>
      <li className="cp-header__navigation__elem">
        Users in room: {activeUsers}
      </li>
    </ul>
  );
};

export default Navigation;
