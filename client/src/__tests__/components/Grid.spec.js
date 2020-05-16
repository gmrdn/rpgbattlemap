import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Grid } from "../../components/Grid";
import canvasUtils from "../../utils/canvasUtils";
import axios from "axios";
import * as data from "../mocks/room-with-tokens.json";
import * as tokens from "../mocks/tokens.json";

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

describe("Components", () => {
  describe("Grid", () => {
    it("renders a grid name", async () => {
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

      const wrapper = await mount(
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
  });
});
