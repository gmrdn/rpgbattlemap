import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import JoinRoom from "../components/JoinRoom";
import CreateRoomButton from "../components/CreateRoomButton";

interface RootState {
  roomId: string;
}

interface IProps {
  roomId: string;
}

interface IState {}

export class Home extends React.Component<IProps, IState> {
  render() {
    if (this.props.roomId !== "") {
      return <Redirect to={`/room/${this.props.roomId}`} />;
    }
    return (
      <div className="d-flex flex-column" style={{ minHeight: "85vh" }}>
        <JoinRoom></JoinRoom>
        <CreateRoomButton></CreateRoomButton>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    roomId: state.roomId,
  };
};

export default connect(mapStateToProps)(Home);
