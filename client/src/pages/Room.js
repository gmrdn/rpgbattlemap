import React from "react";
import Grid from "../components/Grid";
import Chatbox from "../components/Chatbox";
import Dicetray from "../components/Dicetray";

const Room = (props) => {
  if (!props.match.params.id) {
    return <div>No Room ID</div>;
  }
  return (
    <div className="container-fluid">
      <h5 id="room-id">Room {props.match.params.id}</h5>
      <Grid roomId={props.match.params.id} />
      <div className="d-flex justify-content-between">
        <div className="bg-blackflex-grow-1 bd-highlight">
          <Chatbox className="flex-grow-1" roomId={props.match.params.id} />
        </div>
        <div className="bd-highlight">
          <Dicetray></Dicetray>
        </div>
      </div>
    </div>
  );
};

export default Room;
