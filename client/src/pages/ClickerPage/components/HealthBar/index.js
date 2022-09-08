import React from "react";
import { numberWithSpaces } from "../../../../utils/formatters";
import "./styles.scss";

const HealthBar = ({ value }) => {
  const barValue = (value / 1_000_000) * 100;
  return (
    <div className="health-bar">
      <h5 className="health-bar__value">
        {numberWithSpaces(value)} / 1 000 000
      </h5>
      <div className="health-bar__container">
        <div className="health-bar__container_border"></div>
        <div
          className="health-bar__container_inner"
          style={{ width: `calc(${barValue}% - 4px)` }}
        ></div>
      </div>
    </div>
  );
};

export default HealthBar;
