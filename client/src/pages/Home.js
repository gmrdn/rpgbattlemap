import React from "react";
import JoinRoom from "../components/JoinRoom";
import CreateRoomButton from "../components/CreateRoomButton";

const Home = () => (
  <div className="d-flex flex-column" style={{ minHeight: "85vh" }}>
    <JoinRoom></JoinRoom>
    <CreateRoomButton></CreateRoomButton>
  </div>
);

export default Home;
