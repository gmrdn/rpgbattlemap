import React from "react";
import { NavLink } from "react-router-dom";

const CreateRoom = () => (
  <>
    <div
      className="card mx-auto mb-5 border-0 d-flex justify-content-end"
      style={{ width: "15rem", "min-height": "20vh" }}
    >
      <NavLink
        to="/createroom"
        className="btn mx-auto btn-outline-primary btn-sm"
        id="btn-create"
      >
        Create your own room
      </NavLink>
    </div>
  </>
);
export default CreateRoom;
