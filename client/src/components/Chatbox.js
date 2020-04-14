import React from "react";
import io from "socket.io-client";
import axios from "axios";

const divStyle = {
  height: "20vh",
  overflowY: "scroll",
};

const socket = io();

class Chatbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMessage: "",
      chatlogs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      currentMessage: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    socket.emit("/msg", {
      room: this.props.roomId,
      nickname: this.props.nickname,
      message: this.state.currentMessage,
    });
    this.setState({
      currentMessage: "",
    });
  }

  componentDidMount() {
    this.fetchChatlogs(this.props.roomId);

    socket.emit("/join", {
      nickname: this.props.nickname,
      room: this.props.roomId,
    });
    socket.on("/join", (data) => this.addMessage("_server", data));
    socket.on("/leave", (data) => this.addMessage("_server", data));
    socket.on("/msg", ({ nickname, message }) =>
      this.addMessage(nickname, message)
    );
    this.updateScroll();
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  componentWillUnmount() {
    console.log("unmounting chat box");
    socket.emit("/leave", {
      nickname: this.props.nickname,
      room: this.props.roomId,
    });
  }

  addMessage = (nck, msg) => {
    console.log("adding message in state : " + msg);
    this.setState((prevState) => ({
      chatlogs: [...prevState.chatlogs, { nickname: nck, message: msg }],
    }));
  };

  updateScroll() {
    this.messagesEnd.scrollIntoView();
  }

  async fetchChatlogs(roomId) {
    axios.get(`/api/room/${roomId}/chatmessages`).then((response) => {
      this.setState((prevState) => ({
        chatlogs: [...prevState.chatlogs, ...response.data],
      }));
    });

    // this.updateScroll();
  }

  renderMessage(nickname, message) {
    if (nickname === "_server") {
      return (
        <small className="text-secondary">
          <i>{message}</i>
        </small>
      );
    } else {
      return (
        <small>
          <b>{nickname} :</b> {message}
        </small>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div id="messages-log" className="container mb-0" style={divStyle}>
          {this.state.chatlogs.map((log, key) => (
            <div key={key} className="row d-flex">
              <div className="align-center ml-3">
                <div className="mb-1">
                  {this.renderMessage(log.nickname, log.message)}
                </div>
              </div>
            </div>
          ))}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        <div>
          <form autocomplete="off" onSubmit={this.handleSubmit}>
            <input
              id="message-input"
              type="text"
              className="form-control mt-3 mb-1 bg-light rounded-pill"
              value={this.state.currentMessage}
              onChange={this.handleChange}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Chatbox;
