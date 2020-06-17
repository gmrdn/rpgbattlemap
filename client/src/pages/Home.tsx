import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import JoinRoom from "../components/JoinRoom";
import CreateRoomButton from "../components/CreateRoomButton";
import Box from "@material-ui/core/Box";

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
      <Box
        height="100vh"
        style={{
          background:
            "#212121 linear-gradient(140deg, #212121 60%, #880e4f 40%)",
        }}
      >
        <JoinRoom></JoinRoom>
        <CreateRoomButton></CreateRoomButton>
      </Box>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    roomId: state.roomId,
  };
};

export default connect(mapStateToProps)(Home);
