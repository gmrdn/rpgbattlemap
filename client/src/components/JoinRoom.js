import React from "react";
import { NavLink } from "react-router-dom";

const JoinRoom = () => (
  <>
    <div className="card mx-auto mb-5" style={{ width: "18rem" }}>
      <h5>JoinRoom Component</h5>
      <input id="txt-room-id"></input>
      <NavLink
        to="/joinroom"
        className="btn mx-auto btn-primary btn-sm"
        id="btn-create"
      >
        Join room
      </NavLink>
    </div>
  </>
);

export default JoinRoom;
