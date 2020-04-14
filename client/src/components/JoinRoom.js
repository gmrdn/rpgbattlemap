import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setRoomId } from "../actions";

const JoinRoom = (props) => {
  const handleChange = (event) => {
    props.setRoomId(event.target.value);
  };

  return (
    <>
      <div
        className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"
        style={{ width: "15rem", minHeight: "50vh" }}
      >
        <div className="input-group input-group-lg">
          <input
            id="txt-room-id"
            className="form-control mb-3 border-secondary"
            placeholder="Room ID"
            aria-label="Room ID"
            onChange={handleChange}
          ></input>
        </div>
        <NavLink
          to={`/joinroom/${props.roomId}`}
          className="btn btn-dark btn-lg"
          id="btn-join"
        >
          <strong>Enter</strong>
        </NavLink>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

const mapDispatchToProps = { setRoomId };

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
