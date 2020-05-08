import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import { act } from "react-dom/test-utils";
import Chatbox from "../components/Chatbox";
import axios from "axios";

let container = null;

const store = createStore(rootReducer);

beforeEach(() => {
  // met en place un élément DOM comme cible de rendu
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render previous chat messages", async () => {
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

  await act(async () => {
    render(
      <Provider store={store}>
        <Chatbox roomId={roomId} nickname={nickname} socket={socket} />
      </Provider>,
      container
    );
  });

  expect(container.querySelector("#chat-nickname").textContent).toBe(
    "John Lennon :"
  );
  expect(container.querySelector("#chat-message").textContent).toBe(
    " Hello world"
  );
});
