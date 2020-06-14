import React from "react";
import { TokenBar } from "./TokenBar";

export default {
  title: "TokenBar",
};

const socket = () => {};
const tokens = [
  {
    _id: "1234",
    x: 1,
    y: 1,
    name: "Storybook",
    color: "blue",
    image: "1.png",
    selected: false,
  },
  {
    _id: "5678",
    x: 1,
    y: 1,
    name: "Second token",
    color: "green",
    image: "12.png",
    selected: true,
  },
];

export const Default = () => (
  <TokenBar tokens={tokens} socket={socket}></TokenBar>
);

export const Empty = () => <TokenBar tokens={[]} socket={socket}></TokenBar>;
