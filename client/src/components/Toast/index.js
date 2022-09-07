import classNames from "classnames";
import React from "react";
import "./styles.scss";

const Toast = ({ text, type }) => {
  return (
    <div className={classNames("toast", type)}>
      <button>X</button>
      <div className="toast-container">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Toast;
