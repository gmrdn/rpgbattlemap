import React from "react";
import { mount, shallow } from "enzyme";
import { Chatbox } from "../Chatbox";
import { act } from "react-dom/test-utils";
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

describe("Components", () => {
  describe("ChatBox", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      axiosSpy = jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve(fakeMessages));

      Element.prototype.scrollIntoView = jest.fn();
    });

    describe("Renders messages", () => {
      it("renders previous chat messages", async () => {
        await act(async () => {
          wrapper = mount(
            <Chatbox roomId={roomId} nickname={nickname} socket={socket} />
          );
        });
        expect(axiosSpy).toHaveBeenCalled();
        expect(wrapper.text()).toBe("John Lennon : Hello world");
      });
    });

    describe("Emits socket messages", () => {
      it("emits /join with roomId and nickname", async () => {
        await act(async () => {
          wrapper = mount(
            <Chatbox roomId={roomId} nickname={nickname} socket={socket} />
          );
        });
        expect(socket.emit).toHaveBeenCalled();
        expect(socket.emit.mock.calls[0]).toMatchObject([
          "/join",
          { nickname: nickname, room: roomId },
        ]);
      });
    });

    describe("User events", () => {
      it("changes the internal state when typing messages", () => {
        const wrapper = mount(
          <Chatbox roomId={roomId} nickname={nickname} socket={socket} />
        );

        const input = wrapper.find("#message-input");
        act(() => {
          input.simulate("change", { target: { value: "A" } });
        });
        expect(wrapper.state("currentMessage")).toBe("A");
      });

      it("emits a socket message on submit", () => {
        const wrapper = mount(
          <Chatbox roomId={roomId} nickname={nickname} socket={socket} />
        );

        const input = wrapper.find("#message-input");
        input.simulate("change", { target: { value: "A" } });
        const form = wrapper.find("form");

        act(() => {
          form.simulate("submit", {
            preventDefault: () => {},
          });
        });

        expect(socket.emit).toHaveBeenCalled();
        expect(socket.emit.mock.calls[1]).toMatchObject([
          "/msg",
          { nickname: nickname, room: roomId, message: "A" },
        ]);
      });
    });
  });
});
