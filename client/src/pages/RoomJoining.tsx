import React from "react";
import NicknameSelection from "../components/NicknameSelection";
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { setRoomId } from "../actions";

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

const mapDispatchToProps = { setRoomId };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends RouteComponentProps<{ id?: string }>, PropsFromRedux {
  nickname: string;
  roomId: string;
}

const RoomJoining: React.FC<IProps> = (props) => {
  props.setRoomId(props.match.params.id || "");

  return (
    <div className="d-flex flex-column" style={{ minHeight: "85vh" }}>
      <NicknameSelection roomId={props.match.params.id}></NicknameSelection>
    </div>
  );
};

export default connector(RoomJoining);
