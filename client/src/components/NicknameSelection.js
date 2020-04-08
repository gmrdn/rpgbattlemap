import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NicknameSelection = (props) => {
  const [nickname, setNickname] = useState("User");

  const handleChange = (event) => setNickname(event.target.value);

  return (
    <div>
      <h5 id="room-id">Joining room {props.roomId}</h5>
      <input
        id="nickname"
        className="form-control mb-3 border-success"
        placeholder="Room ID"
        aria-label="Room ID"
        onChange={handleChange}
      ></input>{" "}
      <NavLink
        id="btn-join"
        to={{
          pathname: `/room/${props.roomId}`,
          state: { nickname: nickname },
        }}
      >
        Join
      </NavLink>
    </div>
  );
};

export default NicknameSelection;
