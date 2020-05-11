import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import Grid from "../../components/Grid";
import canvasUtils from "../../utils/canvasUtils";
import axios from "axios";
import * as data from "../mocks/room-with-tokens.json";

const store = createStore(rootReducer);

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
  HTMLCanvasElement.prototype.getContext = jest.fn();
  jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve(mockData));
  jest.spyOn(canvasUtils, "drawGrid").mockImplementation(() => false);
  const { getByText } = await render(
    <Provider store={store}>
      <Grid roomId={roomId} nickname={nickname} socket={socket} />
    </Provider>
  );
  expect(getByText("Lair of the Spider")).toBeVisible();
});
