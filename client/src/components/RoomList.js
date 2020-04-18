import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const RoomList = () => {
  const [roomList, setRoomList] = useState(null);

  async function fetchRoomList() {
    const response = await axios(`/api/room`);
    setRoomList(await response.data);
  }

  useEffect(() => {
    fetchRoomList();
  }, []);

  if (!roomList) {
    return "loading...";
  }

  return (
    <ul className="list-group">
      {roomList.map((room, key) => (
        <li key={key} id="room-list" className="list-group-item">
          <NavLink to={`/joinroom/${room._id}`} id={`room-${key}`}>
            {room._id}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default RoomList;
