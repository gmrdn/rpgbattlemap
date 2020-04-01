import React from "react";
import Grid from "./Grid";
import Chatbox from "./Chatbox";
import Dicetray from "./Dicetray";

const roomId = "TRTL1KSQ";
const Room = () => (
  <div className="container-fluid">
    <h5>Room component</h5>
    <h1>Room {roomId}</h1>
    <Grid roomId={roomId} />
    <div className="d-flex justify-content-between">
      <div className="p-2 flex-grow-1 bd-highlight">
        <Chatbox className="flex-grow-1" roomId={roomId} />
      </div>
      <div className="p-2 bd-highlight">
        <Dicetray></Dicetray>
      </div>
    </div>
  </div>
);

export default Room;
