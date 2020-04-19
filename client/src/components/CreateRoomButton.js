import React from "react";
import { NavLink } from "react-router-dom";

const CreateRoomButton = () => (
  <>
    <div
      className="card mx-auto mb-5 border-0 d-flex justify-content-end bg-transparent"
      style={{ width: "15rem", minHeight: "20vh" }}
    >
      <NavLink
        to="/createroom"
        className="btn mx-auto btn-outline-secondary btn-sm"
        id="btn-create"
      >
        Create your own room
      </NavLink>
    </div>
  </>
);
export default CreateRoomButton;
