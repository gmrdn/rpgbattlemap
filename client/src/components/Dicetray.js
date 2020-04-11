import React from "react";
import Dice from "./Dice";

const Dicetray = () => (
  <div className="container">
    <div className="container">
      <div className="row">
        <div className="col">
          <Dice dice="D20"></Dice>
        </div>
        <div className="col">
          <Dice dice="D12"></Dice>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Dice dice="D10"></Dice>
        </div>
        <div className="col">
          <Dice dice="D8"></Dice>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Dice dice="D6"></Dice>
        </div>
        <div className="col">
          <Dice dice="D4"></Dice>
        </div>
      </div>
    </div>
  </div>
);

export default Dicetray;
