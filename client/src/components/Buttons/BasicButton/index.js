import classNames from "classnames";
import React from "react";
import "./styles.scss";

const BasicButton = ({
  children,
  onClick,
  size = "small",
  customClassName,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames("basic-btn", size, customClassName)}
    >
      {children}
    </button>
  );
};

export default BasicButton;
