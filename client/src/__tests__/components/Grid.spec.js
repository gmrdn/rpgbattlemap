import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { Grid } from "../../components/Grid";
import Token from "../../components/Token";
import canvasUtils from "../../utils/canvasUtils";
import axios from "axios";
import * as data from "../mocks/room-with-tokens.json";

let wrapper;
const mockTokens = [
  {
    _id: "1111111111",
    x: 1,
    y: 1,
    name: "Mock Token selected and to be deleted",
    toBeDeleted: true,
    selected: true,
  },
  {
    _id: "2222222222",
    x: 1,
    y: 1,
    name: "Mock Token not selected but to be deleted",
    toBeDeleted: true,
    selected: false,
  },
  {
    _id: "3333333333",
    x: 1,
    y: 1,
    name: "Mock Token not selected and not to be deleted",
    toBeDeleted: false,
    selected: false,
  },
];
const roomId = "5eb3006a6fb25ec2e272a290";
const nickname = "Jest User";
const socket = {
  emit: jest.fn(),
  on: jest.fn(),
};
const mockData = {
  data: data,
};
const resetTokens = jest.fn();

describe("Components", () => {
  describe("Grid", () => {
    describe("General display", () => {
      beforeEach(() => {
        HTMLCanvasElement.prototype.getContext = jest.fn();

        jest
          .spyOn(axios, "get")
          .mockImplementation(() => Promise.resolve(mockData));

        jest.spyOn(canvasUtils, "drawGrid").mockImplementation(() => false);
      });
      it("renders a grid name", async () => {
        wrapper = await mount(
          <Grid
            roomId={roomId}
            nickname={nickname}
            socket={socket}
            resetTokens={resetTokens}
            tokens={mockTokens}
          />
        );

        expect(wrapper.find("#room-name").text()).toBe("Lair of the Spider");
      });

      it("renders all tokens", async () => {
        wrapper = await mount(
          <Grid
            roomId={roomId}
            nickname={nickname}
            socket={socket}
            resetTokens={resetTokens}
            tokens={mockTokens}
          />
        );

        expect(wrapper.find(Token)).toHaveLength(3);
      });

      it("draws a grid", async () => {
        const spy = jest
          .spyOn(canvasUtils, "drawGrid")
          .mockImplementation(() => false);

        wrapper = await mount(
          <Grid
            roomId={roomId}
            nickname={nickname}
            socket={socket}
            resetTokens={resetTokens}
            tokens={mockTokens}
          />
        );

        expect(spy).toHaveBeenCalled();
      });
    });

    describe("User events", () => {
      it("selects a token on left click", async () => {
        const roomId = "5eb3006a6fb25ec2e272a290";
        const nickname = "Jest User";
        const socket = {
          emit: jest.fn(),
          on: jest.fn(),
        };
        const mockData = {
          data: data,
        };
        const resetTokens = jest.fn();
        HTMLCanvasElement.prototype.getContext = jest.fn();

        jest
          .spyOn(axios, "get")
          .mockImplementation(() => Promise.resolve(mockData));

        jest.spyOn(canvasUtils, "drawGrid").mockImplementation(() => false);

        const selectTokenMock = jest.fn();
        const mockEvent = {
          preventDefault: () => {},
          target: {
            parentNode: {
              getAttribute: jest.fn().mockReturnValueOnce("2222222222"),
            },
          },
        };

        const token = {
          _id: "1234567890",
          x: 1,
          y: 1,
          image: "1.png",
          color: "red",
          name: "Jest Token",
          selected: false,
        };

        wrapper = await mount(
          <Grid
            roomId={roomId}
            nickname={nickname}
            socket={socket}
            resetTokens={resetTokens}
            selectToken={selectTokenMock}
            tokens={[token]}
          />
        );

        const tokenElement = wrapper.find(Token);

        act(() => {
          tokenElement.simulate("click", mockEvent);
        });
      });
    });
  });
});
