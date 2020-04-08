import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NicknameSelection = (props) => {
  const [nickname, setNickname] = useState("User");

  const handleChange = (event) => setNickname(event.target.value);

  return (
    <>
      <div
        className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"
        style={{ width: "15rem", "min-height": "50vh" }}
      >
        <div class="input-group input-group-lg">
          <input
            id="nickname"
            className="form-control mb-3 border-secondary"
            placeholder="Nickname"
            aria-label="Nickname"
            onChange={handleChange}
          ></input>
        </div>
        <NavLink
          id="btn-join"
          to={{
            pathname: `/room/${props.roomId}`,
            state: { nickname: nickname },
          }}
          className="btn btn-dark btn-lg"
        >
          <strong>Join</strong>
        </NavLink>
      </div>
    </>
  );
};

export default NicknameSelection;
