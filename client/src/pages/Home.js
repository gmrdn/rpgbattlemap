import React from "react";
import JoinRoom from "../components/JoinRoom";
import CreateRoom from "../components/CreateRoom";

const Home = () => (
  <div className="d-flex flex-column" style={{ "min-height": "85vh" }}>
    <JoinRoom></JoinRoom>
    <CreateRoom></CreateRoom>
  </div>
);

export default Home;
