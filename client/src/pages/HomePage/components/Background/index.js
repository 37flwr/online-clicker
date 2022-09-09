import React from "react";
import BGImage from "../../../../assets/backgrounds/bgMain4.jpg";
import "./styles.scss";

const Background = () => {
  return (
    <div className="bg">
      <div className="bg__image" />
      <img className="bg_darken" src={BGImage} alt="" />
    </div>
  );
};

export default Background;
