import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ title }) => {
  return (
    <Link to={`/click?roomId=${title.replace(/\s/g, "")}`}>
      <div>
        <h5>{title}</h5>
      </div>
    </Link>
  );
};

export default RoomCard;
