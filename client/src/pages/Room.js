import React from "react";
import { Redirect } from "react-router-dom";
import Grid from "../components/Grid";
import Chatbox from "../components/Chatbox";
import Dicetray from "../components/Dicetray";

const Room = (props) => {
  if (!props.match.params.id) {
    return <div>No Room ID</div>;
  }

  if (!props.location.state) {
    return <Redirect to={`/joinroom/${props.match.params.id}`} />;
  }

  return (
    <div className="container-fluid">
      <h5 id="room-id">Room {props.match.params.id}</h5>
      <div id="nickname">{props.location.state.nickname}</div>
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
