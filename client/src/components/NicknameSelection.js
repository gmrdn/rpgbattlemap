import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NicknameSelection = (props) => {
  const [nickname, setNickname] = useState("User");

  const handleChange = (event) => setNickname(event.target.value);

  return (
    <div>
      <h5 id="room-id">Joining room {props.roomId}</h5>
      <input id="nickname"></input>
      <NavLink id="btn-join" to={`/room/${props.roomId}`}>
        Join
      </NavLink>
    </div>
  );
};

export default NicknameSelection;
