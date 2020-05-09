import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import Chatbox from "../components/Chatbox";
import axios from "axios";

const store = createStore(rootReducer);

it("renders previous chat messages", async () => {
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
  jest
    .spyOn(axios, "get")
    .mockImplementation(() => Promise.resolve(fakeMessages));

  Element.prototype.scrollIntoView = jest.fn();

  const { getByText } = await render(
    <Provider store={store}>
      <Chatbox roomId={roomId} nickname={nickname} socket={socket} />
    </Provider>
  );

  expect(getByText("John Lennon :")).toBeVisible();
  expect(getByText("Hello world")).toBeVisible();
});
