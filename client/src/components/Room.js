import React from 'react';
import Grid from './Grid';
import Chatbox from './Chatbox';

const roomId = 'AALKJF2';
const Room = () => (
  <div>
    <h5>Room component</h5>
    <h1>Room {roomId}</h1>
    <Grid />
    <Chatbox roomId={roomId} />
  </div>
);

export default Room;
