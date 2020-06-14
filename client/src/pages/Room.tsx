import React from "react";
import io from "socket.io-client";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { setUserName, setRoomId } from "../actions";
import Chatbox from "../components/Chatbox";
import DialogDeleteToken from "../components/DialogDeleteToken";
import DialogNewToken from "../components/DialogNewToken";
import Grid from "../components/Grid";

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

  toggleChatDrawer = () => {
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
        this.props.setUserName(localStorage.getItem("nickname") || "");
      } else {
        return <Redirect to={`/joinroom/${this.props.match.params.id}`} />;
      }
    }

    return (
      <>
        <div className="d-flex">
          <div className="w-100">
            <Grid socket={socket} roomId={this.props.roomId}></Grid>
          </div>
        </div>

        <DialogDeleteToken socket={socket}></DialogDeleteToken>
        <DialogNewToken socket={socket}></DialogNewToken>
        <Chatbox
          socket={socket}
          nickname={this.props.nickname}
          roomId={this.props.roomId}
        />
      </>
    );
  }
}

export default connector(Room);
