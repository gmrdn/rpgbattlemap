import React from "react";
import { NavLink } from "react-router-dom";

const CreateRoom = () => (
  <>
    <div className="card mx-auto mb-5" style={{ width: "18rem" }}>
      <h5>CreateRoom Component</h5>
      <NavLink
        to="/createroom"
        className="btn mx-auto btn-outline-primary btn-sm"
        id="btn-create"
      >
        Create a room
      </NavLink>
    </div>
  </>
);
export default CreateRoom;
