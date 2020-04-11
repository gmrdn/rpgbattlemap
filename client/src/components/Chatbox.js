import React from "react";
import io from "socket.io-client";
import axios from "axios";

const divStyle = {
  height: "20vh",
  overflowY: "scroll",
};

var socket;

class Chatbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatlogs: [],
    };

    socket = io(":5000");
  }

  componentDidMount() {
    this.fetchChatlogs(this.props.roomId);

    socket.on("broadcast", (data) => this.addMessage("_server", data));
    //   this.setState({
    //     chatlogs: (chatlogs) => [
    //       ...chatlogs,
    //       { nickname: "_server", message: data },
    //     ],
    //   })
    // );
  }

  componentWillUnmount() {
    console.log("unmounting chat box");
    socket.off("broadcast");
  }

  addMessage = (nck, msg) => {
    console.log("adding message : " + msg);

    this.setState((prevState) => ({
      chatlogs: [...prevState.chatlogs, { nickname: nck, message: msg }],
    }));
  };

  updateScroll() {
    var element = document.getElementById("messages-log");
    element.scrollTop = element.scrollHeight;
  }

  async fetchChatlogs(roomId) {
    const response = await axios(`/api/room/${roomId}/chatmessages`);
    this.setState({ chatlogs: await response.data });
    this.updateScroll();
  }

  render() {
    return (
      <div className="container">
        <div id="messages-log" className="container mb-0" style={divStyle}>
          {this.state.chatlogs.map((log, key) => (
            <div key={key} className="row d-flex">
              <div className="align-center ml-3">
                <div className="mb-1">
                  <small>
                    <b>{log.nickname} :</b> {log.message}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="message-input">
          <input
            type="text"
            className="form-control mt-3 mb-1 bg-light rounded-pill"
          ></input>
        </div>
      </div>
    );
  }
}

export default Chatbox;
