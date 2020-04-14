import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUserName, setRoomId } from "../actions";
import Grid from "../components/Grid";
import Chatbox from "../components/Chatbox";
import Dicetray from "../components/Dicetray";

const Room = (props) => {
  if (!props.match.params.id) {
    return <Redirect to={`/`} />;
  }

  if (props.nickname === "") {
    props.setRoomId(props.match.params.roomId);
    return <Redirect to={`/joinroom/${props.match.params.id}`} />;
  }

  return (
    <div className="container-fluid">
      <Grid roomId={props.roomId} />
      <div className="d-flex justify-content-between">
        <div className="p-2 flex-grow-1 bd-highlight">
          <Chatbox
            className="flex-grow-1"
            nickname={props.nickname}
            roomId={props.roomId}
          />
        </div>
        <div className="p-2 bd-highlight">
          <Dicetray></Dicetray>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

const mapDispatchToProps = { setUserName, setRoomId };

export default connect(mapStateToProps, mapDispatchToProps)(Room);
