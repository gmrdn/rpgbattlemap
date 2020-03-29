import React, { useState, useEffect } from 'react';

const Chatbox = props => {
  const [chatlogs, setChatlogs] = useState(null);

  async function fetchChatlogs(roomId) {
    const response = await fetch('/chat/' + roomId);
    setChatlogs(await response.json());
  }

  useEffect(() => {
    fetchChatlogs(props.roomId);
  }, [props.roomId]);

  if (!chatlogs) {
    return 'loading...';
  }

  return (
    <>
      <h5>Chatbox component</h5>
      <ul id="messages-log">
        {chatlogs.logs.map((log, key) => (
          <li key={key} value={log.nickname}>
            {log.nickname} : {log.message}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Chatbox;
