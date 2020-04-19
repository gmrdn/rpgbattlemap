import React from "react";
import { NavLink } from "react-router-dom";

const RoomCreationForm = () => {
  return (
    <form>
      <div className="form-group">
        <input
          id="txt-room-name"
          className="form-control mb-3 border-secondary"
          placeholder="Room name"
          aria-label="Room name"
          required
        ></input>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="background-grass"
            value="option1"
            checked
          />
          <label className="form-check-label" for="exampleRadios1">
            <div className="card" style={{ width: "12rem" }}>
              <img
                src="/bg-grass.jpg"
                className="card-img-top"
                alt="Grass background"
                style={{ minHeight: "100%" }}
              />
              <div className="card-body">
                <p className="card-text">Grass background</p>
              </div>
            </div>
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="background-stone"
            value="option2"
          />
          <label className="form-check-label" for="exampleRadios2">
            <div className="card" style={{ width: "12rem" }}>
              <img
                src="/bg-stone.png"
                className="card-img-top"
                alt="Stone background"
              />
              <div className="card-body">
                <p className="card-text">Stone background</p>
              </div>
            </div>
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="background-none"
            value="option4"
            checked
          />
          <label className="form-check-label" for="exampleRadios4">
            No background
          </label>
        </div>
      </div>

      <NavLink
        id="btn-create"
        to={{
          pathname: `/room/`,
        }}
        className="btn btn-dark"
      >
        <strong>Create Room</strong>
      </NavLink>
    </form>
  );
};

export default RoomCreationForm;
