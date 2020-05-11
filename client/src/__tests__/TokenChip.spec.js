import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import TokenChip from "../components/TokenChip";

const store = createStore(rootReducer);

it("renders a token chip", () => {
  const token = {
    x: 1,
    y: 1,
    image: "1.png",
    color: "red",
    name: "Jest Token",
    selected: false,
  };

  const { getByText } = render(
    <Provider store={store}>
      <TokenChip token={token} />
    </Provider>
  );

  expect(getByText("Jest Token")).toBeVisible();
});
