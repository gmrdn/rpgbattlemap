import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const divStyle = {
  height: "20vh",
  overflowY: "scroll",
};

function updateScroll() {
  var element = document.getElementById("messages-log");
  element.scrollTop = element.scrollHeight;
}

const Chatbox = (props) => {
  async function fetchChatlogs(roomId) {
    const response = await axios(`/api/room/${roomId}/chatmessages`);
    setChatlogs(await response.data);

    updateScroll();
  }

  const [chatlogs, setChatlogs] = useState([]);
  useEffect(() => {
    fetchChatlogs(props.roomId);
  }, [props.roomId]);

  useEffect(() => {
    const socket = io(":5000");
    socket.on("broadcast", (data) =>
      setChatlogs((chatlogs) => [
        ...chatlogs,
        { nickname: "_server", message: data },
      ])
    );
  }, 0);

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
        ></input>
      </div>
    </div>
  );
};

export default Chatbox;
