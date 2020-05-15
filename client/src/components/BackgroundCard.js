import React from "react";

const BackgroundCard = (props) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="backgroundRadios"
        id={props.id}
        value={props.image}
      />
      <label className="form-check-label" for="backgroundRadios1">
        <div className="card" style={{ width: "12rem", height: "12rem" }}>
          <img
            src={`/${props.image}`}
            className="card-img-top"
            alt={props.label}
            style={{ minHeight: "100%" }}
          />
          <div className="card-body">
            <p className="card-text">{props.label}</p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default BackgroundCard;
