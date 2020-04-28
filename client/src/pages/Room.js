import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUserName, setRoomId } from "../actions";
import Grid from "../components/Grid";
import Drawer from "@material-ui/core/Drawer";
import Chatbox from "../components/Chatbox";
import TokenBar from "../components/TokenBar";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatOpen: true,
      tokenBarOpen: true,
    };
  }

  handleDrawerOpenChat = () => {
    if (this.state.chatOpen) {
      this.setState({ chatOpen: false });
    } else {
      this.setState({ chatOpen: true });
    }
  };

  handleDrawerOpenTokenBar = () => {
    if (this.state.tokenBarOpen) {
      this.setState({ tokenBarOpen: false });
    } else {
      this.setState({ tokenBarOpen: true });
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            id="btn-chatbox"
            className="btn"
            onClick={this.handleDrawerOpenChat}
          >
            Chatbox
          </button>

          <button
            id="btn-tokenbar"
            class="btn"
            type="button"
            data-toggle="collapse"
            data-target="#token-bar"
            aria-expanded="true"
            aria-controls="token-bar"
          >
            Token Bar
          </button>
        </nav>
        <div className="d-flex bd-highlight">
          <div className="p-2 w-100 bd-highlight">
            <Grid roomId={this.props.roomId}></Grid>
          </div>
          <div id="token-bar" className="collapse">
            <TokenBar></TokenBar>
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
