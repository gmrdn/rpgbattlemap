import React from "react";
import Dice from "./Dice";

const Dicetray = () => (
  <div className="container">
    <div class="container">
      <div class="row">
        <div class="col">
          <Dice dice="D20"></Dice>
        </div>
        <div class="col">
          <Dice dice="D12"></Dice>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Dice dice="D10"></Dice>
        </div>
        <div class="col">
          <Dice dice="D8"></Dice>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Dice dice="D6"></Dice>
        </div>
        <div class="col">
          <Dice dice="D4"></Dice>
        </div>
      </div>
    </div>
  </div>
);

export default Dicetray;
