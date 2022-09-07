import React from "react";
import "./styles.scss";

const CopyButton = ({
  children,
  width,
  height,
  onClick,
  ...cusomClassName
}) => {
  return (
    <button
      className="copy-btn"
      onClick={onClick}
      style={{
        width: width,
        height: height,
        ...cusomClassName,
      }}
    >
      {children}
    </button>
  );
};

export default CopyButton;
