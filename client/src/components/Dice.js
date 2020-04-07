import React from "react";

const Dice = (props) => {
  return (
    <div className="card">
      <button className="btn btn-secondary">{props.dice}</button>
    </div>
  );
};

export default Dice;
