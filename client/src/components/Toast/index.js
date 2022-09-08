import classNames from "classnames";
import React from "react";
import "./styles.scss";

const Toast = ({ text, type = "action", id, deleteToast, customClassName }) => {
  return (
    <div
      className={classNames("toast", type, customClassName)}
      onClick={() => deleteToast && deleteToast(id)}
    >
      {deleteToast && <button className="toast-btn">X</button>}
      <p className="toast-text">{text}</p>
    </div>
  );
};

export default Toast;
