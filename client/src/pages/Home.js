import React from "react";
import JoinRoom from "../components/JoinRoom";
import CreateRoom from "../components/CreateRoom";

const Home = () => (
  <div
    className="d-flex flex-column bg-darken-4"
    style={{ "min-height": "85vh" }}
  >
    <div>Home Component</div>
    <JoinRoom></JoinRoom>
    <CreateRoom></CreateRoom>
  </div>
);

export default Home;
