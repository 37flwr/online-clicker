import classNames from "classnames";
import React from "react";
import "./styles.scss";

const CopyButton = ({ children, onClick, customClassName }) => {
  return (
    <button
      className={classNames("copy-btn", customClassName)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CopyButton;
