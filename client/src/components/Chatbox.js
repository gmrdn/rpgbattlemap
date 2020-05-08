import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { setUserName, setRoomId, addToken } from "../actions";

const divStyle = {
  height: "20vh",
  overflowY: "scroll",
};

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
    this.props.socket.emit("/msg", {
      room: this.props.roomId,
      nickname: this.props.nickname,
      message: this.state.currentMessage,
    });
    this.setState({
      currentMessage: "",
    });
  }

  componentDidMount() {
    this.fetchRoomData(this.props.roomId);

    this.props.socket.emit("/join", {
      nickname: this.props.nickname,
      room: this.props.roomId,
    });
    this.props.socket.on("/join", (data) => {
      this.addMessage("_server", data);
    });
    this.props.socket.on("/leave", (data) => this.addMessage("_server", data));
    this.props.socket.on("/msg", ({ nickname, message }) =>
      this.addMessage(nickname, message)
    );
    this.updateScroll();
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  componentWillUnmount() {
    console.log("unmounting chat box");
    this.props.socket.emit("/leave", {
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

  async fetchRoomData(roomId) {
    axios
      .get(`/api/room/${roomId}`)
      .then((response) => {
        this.setState((prevState) => ({
          chatlogs: [...prevState.chatlogs, ...response.data.chatMessages],
        }));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
          <span id="chat-nickname">
            <b>{nickname} :</b>
          </span>
          <span id="chat-message"> {message}</span>
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
          <form autoComplete="off" onSubmit={this.handleSubmit}>
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

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = { setUserName, setRoomId, addToken };

Chatbox.propTypes = {
  socket: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
