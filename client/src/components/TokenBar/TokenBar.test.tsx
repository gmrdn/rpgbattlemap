import React from "react";
import { shallow } from "enzyme";
import { TokenBar } from "./TokenBar";

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

describe("Components", () => {
  describe("TokenBar", () => {
    it("displays a button with a text as parameter", () => {
      const wrapper = shallow(
        <TokenBar tokens={tokens} socket={socket}></TokenBar>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
