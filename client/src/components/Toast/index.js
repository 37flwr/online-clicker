import classNames from "classnames";
import React from "react";
import "./styles.scss";

const Toast = ({ text, type, id, deleteToast }) => {
  return (
    <div className={classNames("toast", type)} onClick={() => deleteToast(id)}>
      <button className="toast-btn">X</button>
      {/* <div className="toast-container"> */}
      <p className="toast-text">{text}</p>
      {/* </div> */}
    </div>
  );
};

export default Toast;
