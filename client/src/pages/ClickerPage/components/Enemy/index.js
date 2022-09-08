import React from "react";
import EnemyImg from "../../../../assets/enemy1.png";
import "./styles.scss";

const Enemy = () => {
  return (
    <div className="enemy">
      <img src={EnemyImg} alt="Enemy" className="enemy__character" />
      <div className="enemy_shadow" />
    </div>
  );
};

export default Enemy;
