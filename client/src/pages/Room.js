import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUserName, setRoomId } from "../actions";
import Grid from "../components/Grid";
import Drawer from "@material-ui/core/Drawer";
import Chatbox from "../components/Chatbox";
// import Dicetray from "../components/Dicetray";
import TokenBar from "../components/TokenBar";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatOpen: true,
      tokenBarOpen: false,
    };
  }

  handleDrawerOpenChat = () => {
    if (this.state.chatOpen) {
      this.setState({ chatOpen: false });
    } else {
      this.setState({ chatOpen: true });
    }
  };

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
      <>
        <button onClick={this.handleDrawerOpenChat}>Chatbox</button>

        <div class="d-flex bd-highlight">
          <div class="p-2 w-100 bd-highlight">
            <Grid roomId={this.props.roomId}></Grid>
          </div>
          <div class="p-2 flex-shrink-1 bd-highlight">
            <TokenBar></TokenBar>{" "}
          </div>
        </div>

        <Drawer variant="persistent" anchor="bottom" open={this.state.chatOpen}>
          <Chatbox
            className="flex-grow-1"
            nickname={this.props.nickname}
            roomId={this.props.roomId}
          />
        </Drawer>
      </>
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
