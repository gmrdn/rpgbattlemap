import React, { useState, useEffect } from "react";

const divStyle = {
  height: "300px",
  overflowY: "scroll"
};

function updateScroll() {
  var element = document.getElementById("messages-log");
  element.scrollTop = element.scrollHeight;
}

const Chatbox = props => {
  const [chatlogs, setChatlogs] = useState(null);

  async function fetchChatlogs(roomId) {
    const response = await fetch("/api/chatlogs/" + roomId);
    setChatlogs(await response.json());
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
      <h5>Chatbox component</h5>

      <div id="messages-log" className="container" style={divStyle}>
        {chatlogs.map((log, key) => (
          <div key={key} className="row d-flex justify-content-between">
            <div className="card border-0 mb-0">
              <div className="card-title mb-0">
                <div className="badge badge-pill badge-info mr-3">
                  {log.nickname}
                </div>
              </div>
              <div className="card-body">
                <div className="col-lg shadow-sm p-3 mt-n3 mb-0 bg-light rounded">
                  {log.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="message-input">
        <input type="text" className="form-control mt-3 mb-1 bg-light"></input>
      </div>
    </div>
  );
};

export default Chatbox;
