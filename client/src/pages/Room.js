import React from "react";
import Grid from "../components/Grid";
import Chatbox from "../components/Chatbox";
import Dicetray from "../components/Dicetray";

// const roomId = "5e8652b29e6f56c6b0ff1d79";

const Room = props => {
  if (!props.match.params.id) {
    return <div>No Room ID</div>;
  }
  return (
    <div className="container-fluid">
      <h5>Room component</h5>
      <h1>Room {props.match.params.id}</h1>
      <Grid roomId={props.match.params.id} />
      <div className="d-flex justify-content-between">
        <div className="p-2 flex-grow-1 bd-highlight">
          <Chatbox className="flex-grow-1" roomId={props.match.params.id} />
        </div>
        <div className="p-2 bd-highlight">
          <Dicetray></Dicetray>
        </div>
      </div>
    </div>
  );
};

export default Room;
