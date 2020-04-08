import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");

  const handleChange = (event) => setRoomId(event.target.value);

  return (
    <>
      <div
        className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"
        style={{ width: "15rem", "min-height": "50vh" }}
      >
        <div class="input-group input-group-lg">
          <input
            id="txt-room-id"
            className="form-control mb-3 border-success"
            placeholder="Room ID"
            aria-label="Room ID"
            onChange={handleChange}
          ></input>
        </div>
        <NavLink
          to={`/joinroom/${roomId}`}
          className="btn btn-dark btn-lg"
          id="btn-join"
        >
          <strong>
            <large>Enter</large>
          </strong>
        </NavLink>
      </div>
    </>
  );
};

export default JoinRoom;
