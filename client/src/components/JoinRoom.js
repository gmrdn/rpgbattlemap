import React from "react";
import { NavLink } from "react-router-dom";

const JoinRoom = () => (
  <>
    <div
      className="card mx-auto mb-5 border-0 d-flex justify-content-center"
      style={{ width: "15rem", "min-height": "50vh" }}
    >
      <div class="input-group input-group-lg">
        <input
          id="txt-room-id"
          className="form-control mb-3"
          placeholder="Room ID"
          aria-label="Room ID"
        ></input>
      </div>
      <NavLink to="/joinroom" className="btn btn-dark btn-lg" id="btn-join">
        <strong>
          <large>Enter</large>
        </strong>
      </NavLink>
    </div>
  </>
);

export default JoinRoom;
