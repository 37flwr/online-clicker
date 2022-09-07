import React from "react";
import EnemyImg from "../../../../assets/enemy1.png";
import "./styles.scss";

const Enemy = () => {
  return (
    <>
      <img src={EnemyImg} alt="Enemy" className="enemy-character" />
      <div className="enemy-shadow" />
    </>
  );
};

export default Enemy;
