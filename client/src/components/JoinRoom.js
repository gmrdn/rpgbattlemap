import React from "react";
import { connect } from "react-redux";
import { setRoomId } from "../actions";
import EnterButton from "./EnterButton/EnterButton";
import Box from "@material-ui/core/Box";

export class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "",
    };
  }
  handleChange = (e) => {
    this.setState({ roomId: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setRoomId(this.state.roomId);
  };
  render() {
    return (
      <Box style={{ width: "15rem" }}>
        {/* <div className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"> */}
        <form onSubmit={this.handleSubmit}>
          <div className="input-group input-group-lg">
            <input
              id="txt-room-id"
              className="form-control mb-3 border-secondary"
              placeholder="Room ID"
              aria-label="Room ID"
              onChange={this.handleChange}
            ></input>
          </div>
          <EnterButton text="Enter"></EnterButton>
        </form>
        {/* </div> */}
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

const mapDispatchToProps = { setRoomId };

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
