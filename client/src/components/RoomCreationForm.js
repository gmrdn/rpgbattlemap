import React from "react";
import { NavLink } from "react-router-dom";

const RoomCreationForm = () => {
  return (
    <div
      className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"
      style={{ width: "48rem", minHeight: "50vh" }}
    >
      <form>
        <div className="form-group">
          <input
            id="txt-room-name"
            className="form-control mb-3 border-secondary"
            placeholder="Room name"
            aria-label="Room name"
            required
          ></input>
        </div>
        <div className="form-group mb-5">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="backgroundRadios"
              id="background-grass"
              value="grass"
            />
            <label className="form-check-label" for="backgroundRadios1">
              <div className="card" style={{ width: "12rem", height: "12rem" }}>
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

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="backgroundRadios"
              id="background-stone"
              value="stone"
            />
            <label className="form-check-label" for="backgroundRadios2">
              <div className="card" style={{ width: "12rem", height: "12rem" }}>
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

          <div
            className="form-check form-check-inline"
            style={{ width: "12rem", height: "12rem" }}
          >
            <input
              className="form-check-input"
              type="radio"
              name="backgroundRadios"
              id="background-none"
              value="option4"
            />
            <label className="form-check-label" for="backgroundRadios4">
              No background
            </label>
          </div>
        </div>
        <div className="form-row align-items-center">
          <NavLink
            id="btn-create"
            to={{
              pathname: `/room/`,
            }}
            className="btn btn-dark btn-lg"
          >
            <strong>Create Room</strong>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default RoomCreationForm;
