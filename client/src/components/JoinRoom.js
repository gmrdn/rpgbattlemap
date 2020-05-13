import React from "react";
import { connect } from "react-redux";
import { setRoomId } from "../actions";

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
      <div
        className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"
        style={{ width: "15rem", minHeight: "50vh" }}
      >
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
          <div className="row justify-content-center">
            <button
              type="submit"
              className="btn btn-dark btn-lg w-100"
              id="btn-join"
            >
              <strong>Enter</strong>
            </button>
          </div>
        </form>
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

const mapDispatchToProps = { setRoomId };

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
