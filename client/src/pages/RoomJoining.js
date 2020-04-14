import React from "react";
import NicknameSelection from "../components/NicknameSelection";
import { connect } from "react-redux";
import { setRoomId } from "../actions";

const RoomJoining = (props) => {
  props.setRoomId(props.match.params.id);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "85vh" }}>
      <NicknameSelection roomId={props.match.params.id}></NicknameSelection>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

const mapDispatchToProps = { setRoomId };

export default connect(mapStateToProps, mapDispatchToProps)(RoomJoining);
