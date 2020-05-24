import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { Grid } from "../../components/Grid";
import Token from "../../components/Token";
import DrawingToolbar from "../../components/DrawingToolbar";
import canvasUtils from "../../utils/canvasUtils";
import axios from "axios";
import * as data from "../mocks/room-with-tokens.json";

let wrapper;
let canvas;
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
const addTokenMock = jest.fn();
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
      jest.clearAllMocks();
    });

    describe("General display", () => {
      it("renders a grid name", async () => {
        await act(async () => {
          wrapper = mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              addToken={addTokenMock}
              resetTokens={resetTokensMock}
              tokens={mockTokens}
            />
          );
        });

        expect(wrapper.find("#room-name").text()).toBe("Lair of the Spider");
      });

      it("renders a drawing toolbar", async () => {
        await act(async () => {
          wrapper = mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              addToken={addTokenMock}
              resetTokens={resetTokensMock}
              tokens={mockTokens}
            />
          );
        });

        expect(wrapper.find(DrawingToolbar)).toExist();
      });

      it("renders all tokens", async () => {
        await act(async () => {
          wrapper = mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              addToken={addTokenMock}
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
          wrapper = mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              addToken={addTokenMock}
              resetTokens={resetTokensMock}
              tokens={mockTokens}
            />
          );
        });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("User events", () => {
      describe("Actions on Token", () => {
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

          wrapper = mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              addToken={addTokenMock}
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
      });
      describe("Actions on the canvas", () => {
        beforeEach(async () => {
          wrapper = mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              addToken={addTokenMock}
              resetTokens={resetTokensMock}
              selectToken={selectTokenMock}
              moveToken={moveTokenMock}
              tokens={mockTokens}
            />
          );

          canvas = wrapper.find("canvas");
        });
        it("prevents right click context menu on the canvas", async () => {
          const mockEvent = {
            preventDefault: jest.fn(),
          };

          const spy = jest.spyOn(mockEvent, "preventDefault");
          act(() => {
            canvas.simulate("contextmenu", mockEvent);
          });
          expect(spy).toHaveBeenCalled();
        });

        it("changes token coordinates on mouse down", async () => {
          act(() => {
            canvas.prop("onMouseDown")({
              clientX: 160,
              clientY: 240,
              button: 0,
            });
          });
          expect(wrapper.prop("moveToken")).toHaveBeenCalled();
          expect(socket.emit).toHaveBeenCalled();
          expect(socket.emit.mock.calls[0]).toMatchObject([
            "moveToken",
            { room: roomId, user: nickname, tokenId: "1111111111", x: 4, y: 6 },
          ]);
        });

        it("doesn't change coordinates when no token is selected", async () => {
          const mockTokens = [
            {
              _id: "1111111111",
              x: 1,
              y: 1,
              name: "Mock Token not selected and to be deleted",
              toBeDeleted: true,
              selected: false,
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
          wrapper = mount(
            <Grid
              roomId={roomId}
              nickname={nickname}
              socket={socket}
              addToken={addTokenMock}
              resetTokens={resetTokensMock}
              selectToken={selectTokenMock}
              moveToken={moveTokenMock}
              tokens={mockTokens}
            />
          );

          canvas = wrapper.find("canvas");

          act(() => {
            canvas.prop("onMouseDown")({
              clientX: 160,
              clientY: 240,
              button: 0,
            });
          });
          expect(wrapper.prop("moveToken")).not.toHaveBeenCalled();
          expect(socket.emit).not.toHaveBeenCalled();
        });
        it("doesn't change coordinates when the click is not the left button", async () => {
          act(() => {
            canvas.prop("onMouseDown")({
              clientX: 160,
              clientY: 240,
              button: 1,
            });
          });
          expect(wrapper.prop("moveToken")).not.toHaveBeenCalled();
          expect(socket.emit).not.toHaveBeenCalled();
        });
      });
    });
  });
});
