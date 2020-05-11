import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import TokenChip from "../components/TokenChip";

const store = createStore(rootReducer);

it("renders an unselected token chip", () => {
  const token = {
    _id: "1234567890",
    x: 1,
    y: 1,
    image: "1.png",
    color: "red",
    name: "Jest Token",
    selected: false,
  };

  const wrapper = mount(
    <Provider store={store}>
      <TokenChip token={token} />
    </Provider>
  );

  expect(wrapper.text()).toBe("Jest Token");
});

it("renders a selected token chip", () => {
  const token = {
    x: 1,
    y: 1,
    image: "1.png",
    color: "red",
    name: "Jest Token",
    selected: true,
  };

  const wrapper = mount(
    <Provider store={store}>
      <TokenChip token={token} />
    </Provider>
  );

  expect(wrapper.text()).toBe("Jest Token");
});
