import React from "react";
import { numberWithSpaces } from "../../../../utils/formatters";
import "./styles.scss";

const HealthBar = ({ value }) => {
  const barValue = (value / 1_000_000) * 100;
  return (
    <div className="health-component">
      <h5 className="health-value">
        {numberWithSpaces(value)} <b>/</b> 1 000 000
      </h5>
      <div className="health-bar">
        <div className="health-bar-border"></div>
        <div
          className="health-bar-inner"
          style={{ width: `calc(${barValue}% - 4px)` }}
        ></div>
      </div>
    </div>
  );
};

export default HealthBar;
