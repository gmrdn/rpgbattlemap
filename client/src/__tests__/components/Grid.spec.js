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
const resetTokensMock = jest.fn();
const selectTokenMock = jest.fn();
const moveTokenMock = jest.fn();

describe("Components", () => {
  describe("Grid", () => {
    beforeEach(() => {
      HTMLCanvasElement.prototype.getContext = jest.fn();

      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve(mockData));

      jest.spyOn(canvasUtils, "drawGrid").mockImplementation(() => false);
    });

    describe("General display", () => {
      it("renders a grid name", async () => {
        await act(async () => {
          wrapper = await mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              resetTokens={resetTokensMock}
              tokens={mockTokens}
            />
          );
        });

        expect(wrapper.find("#room-name").text()).toBe("Lair of the Spider");
      });

      it("renders all tokens", async () => {
        await act(async () => {
          wrapper = await mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              resetTokens={resetTokensMock}
              tokens={mockTokens}
            />
          );
        });
        expect(wrapper.find(Token)).toHaveLength(3);
      });

      it("draws a grid", async () => {
        const spy = jest
          .spyOn(canvasUtils, "drawGrid")
          .mockImplementation(() => false);

        await act(async () => {
          wrapper = await mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              resetTokens={resetTokensMock}
              tokens={mockTokens}
            />
          );
        });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("User events", () => {
      it("selects a token on left click", async () => {
        //when the avatar has an image
        const mockEventWithId = {
          preventDefault: () => {},
          target: {
            id: "1234567890",
            parentNode: {
              id: "",
            },
          },
        };
        //when avatar has no image, get the id from parent node
        const mockEventWithoutId = {
          preventDefault: () => {},
          target: {
            id: "",
            parentNode: {
              id: "1234567890",
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
            resetTokens={resetTokensMock}
            selectToken={selectTokenMock}
            tokens={[token]}
          />
        );

        const tokenElement = wrapper.find(Token);

        tokenElement.simulate("click", mockEventWithId);
        expect(selectTokenMock).toHaveBeenCalledWith("1234567890");

        tokenElement.simulate("click", mockEventWithoutId);
        expect(selectTokenMock).toHaveBeenCalledWith("1234567890");
      });

      it("prevents right click context menu on the canvas", async () => {
        const mockEvent = {
          preventDefault: jest.fn(),
        };

        const spy = jest.spyOn(mockEvent, "preventDefault");

        wrapper = await mount(
          <Grid
            roomId={roomId}
            nickname={nickname}
            socket={socket}
            resetTokens={resetTokensMock}
            selectToken={selectTokenMock}
            tokens={mockTokens}
          />
        );

        const canvas = wrapper.find("canvas");

        canvas.simulate("contextmenu", mockEvent);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
