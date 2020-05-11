import React from "react";
import { mount } from "enzyme";
import { Chatbox } from "../components/Chatbox";
import axios from "axios";

const roomId = "5eb3006a6fb25ec2e272a290";
const nickname = "Jest User";
const socket = { emit: jest.fn(), on: jest.fn() };
const fakeMessages = {
  data: {
    chatMessages: [
      {
        nickname: "John Lennon",
        message: "Hello world",
      },
    ],
  },
};
let wrapper;
let axiosSpy;

describe("ChatBox", () => {
  beforeEach(async () => {
    axiosSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(fakeMessages));

    Element.prototype.scrollIntoView = jest.fn();

    wrapper = await mount(
      <Chatbox roomId={roomId} nickname={nickname} socket={socket} />
    );
  });

  describe("Renders messages", () => {
    it("renders previous chat messages", async () => {
      expect(axiosSpy).toHaveBeenCalled();
      expect(wrapper.text()).toBe("John Lennon : Hello world");
    });
  });

  describe("Emits socket messages", () => {
    it("emits /join with roomId and nickname", async () => {
      expect(socket.emit).toHaveBeenCalled();
      expect(socket.emit.mock.calls[0]).toMatchObject([
        "/join",
        { nickname: nickname, room: roomId },
      ]);
    });
  });
});
