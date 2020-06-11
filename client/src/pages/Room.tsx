import React from "react";
import io from "socket.io-client";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { connect, ConnectedProps } from "react-redux";
import { setUserName, setRoomId } from "../actions";
import Grid from "../components/Grid";
import Drawer from "@material-ui/core/Drawer";
import Chatbox from "../components/Chatbox";
import TokenBar from "../components/TokenBar";
import DialogDeleteToken from "../components/DialogDeleteToken";
import DialogNewToken from "../components/DialogNewToken";

interface RootState {
  nickname: string;
  roomId: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

const mapDispatchToProps = { setUserName, setRoomId };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends RouteComponentProps<{ id?: string }>, PropsFromRedux {
  nickname: string;
  roomId: string;
}

interface IState {
  chatOpen: boolean;
  tokenBarOpen: boolean;
}

let socket: object;

export class Room extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      chatOpen: true,
      tokenBarOpen: true,
    };
    socket = io();
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
        this.props.setUserName(localStorage.getItem("nickname") || "");
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
            className="btn"
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
            <Grid socket={socket} roomId={this.props.roomId}></Grid>
          </div>
          <div id="token-bar" className="collapse">
            <TokenBar socket={socket}></TokenBar>
          </div>
        </div>

        <DialogDeleteToken socket={socket}></DialogDeleteToken>
        <DialogNewToken socket={socket}></DialogNewToken>
        <Drawer
          variant="persistent"
          anchor="bottom"
          open={this.state.chatOpen}
          style={{ opacity: "0.8" }}
        >
          <Chatbox
            className="flex-grow-1"
            socket={socket}
            nickname={this.props.nickname}
            roomId={this.props.roomId}
          />
        </Drawer>
      </>
    );
  }
}

export default connector(Room);
