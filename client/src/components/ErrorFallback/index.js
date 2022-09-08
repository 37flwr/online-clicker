import React from "react";
import NavBar from "../../pages/HomePage/components/NavBar";
import "./styles.scss";

const ErrorFallback = ({ text = "Oops! Something went wrong..." }) => {
  return (
    <>
      <NavBar />
      <div className="error-fallback">{text}</div>
    </>
  );
};

export default ErrorFallback;
