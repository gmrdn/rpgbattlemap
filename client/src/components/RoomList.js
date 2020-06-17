import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";

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
    return <div>loading...</div>;
  }

  return (
    <List>
      {roomList.map((room, key) => (
        <ListItem key={key} id="room-list">
          <Link
            component={RouterLink}
            color="inherit"
            to={`/joinroom/${room._id}`}
            id={`room-${key}`}
          >
            {`${room._id} - ${room.grid.name}`}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default RoomList;
