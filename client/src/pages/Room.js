import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUserName, setRoomId } from "../actions";
import Grid from "../components/Grid";
import Chatbox from "../components/Chatbox";
import Dicetray from "../components/Dicetray";

class Room extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    if (!this.props.match.params.id) {
      return <Redirect to={`/`} />;
    }

    if (this.props.nickname === "") {
      this.props.setRoomId(this.props.match.params.id);
      if (localStorage.getItem("nickname")) {
        this.props.setUserName(localStorage.getItem("nickname"));
      } else {
        return <Redirect to={`/joinroom/${this.props.match.params.id}`} />;
      }
    }

    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <div className="p-2 flex-grow-1 bd-highlight">
            <Grid roomId={this.props.roomId} />
          </div>
          <div className="p-2 bd-highlight">Tokens bar</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="p-2 flex-grow-1 bd-highlight">
            <Chatbox
              className="flex-grow-1"
              nickname={this.props.nickname}
              roomId={this.props.roomId}
            />
          </div>
          <div className="p-2 bd-highlight">
            <Dicetray></Dicetray>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

const mapDispatchToProps = { setUserName, setRoomId };

export default connect(mapStateToProps, mapDispatchToProps)(Room);
