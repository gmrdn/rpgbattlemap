import React, { useState, useEffect } from "react";
import { connect, sendMsg } from "../socket";
import axios from "axios";

const divStyle = {
  height: "20vh",
  overflowY: "scroll",
};

function updateScroll() {
  var element = document.getElementById("messages-log");
  element.scrollTop = element.scrollHeight;
}

const send = (event) => {
  if (event.keyCode === 13) {
    sendMsg(event.target.value);
    event.target.value = "";
  }
};

const Chatbox = (props) => {
  const [chatlogs, setChatlogs] = useState(null);

  async function fetchChatlogs(roomId) {
    const response = await axios(`/api/room/${roomId}/chatmessages`);
    setChatlogs(await response.data);
    // connect();
    updateScroll();
  }

  useEffect(() => {
    fetchChatlogs(props.roomId);
  }, [props.roomId]);

  if (!chatlogs) {
    return "loading...";
  }

  return (
    <div className="container">
      <div id="messages-log" className="container mb-0" style={divStyle}>
        {chatlogs.map((log, key) => (
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
          onKeyDown={send}
        ></input>
      </div>
    </div>
  );
};

export default Chatbox;
