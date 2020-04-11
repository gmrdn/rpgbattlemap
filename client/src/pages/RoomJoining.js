import React from "react";
import NicknameSelection from "../components/NicknameSelection";

const RoomJoining = (props) => (
  <div className="d-flex flex-column" style={{ minHeight: "85vh" }}>
    <NicknameSelection roomId={props.match.params.id}></NicknameSelection>
  </div>
);

export default RoomJoining;
