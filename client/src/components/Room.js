import React from "react";
import Grid from "./Grid";
import Chatbox from "./Chatbox";
import Dicetray from "./Dicetray";

const roomId = "5e820efb1ddf9a37923593d1";
const Room = () => (
  <div className="container-fluid border">
    <h5>Room component</h5>
    <h1>Room {roomId}</h1>
    <Grid />
    <div className="d-flex justify-content-between">
      <div className="p-2 flex-grow-1 bd-highlight">
        <Chatbox className="flex-grow-1" roomId={roomId} />
      </div>
      <div class="p-2 bd-highlight">
        <Dicetray></Dicetray>
      </div>
    </div>
  </div>
);

export default Room;
