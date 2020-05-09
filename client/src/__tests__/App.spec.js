import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

const store = createStore(rootReducer);

it("navigates home when you click the logo", async () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/createroom"]}>
        <App />,
      </MemoryRouter>
    </Provider>
  );

  act(() => {
    fireEvent.click(getByText(/RPG Battle Map/i));
  });

  expect(getByText(/Enter/i)).toBeTruthy();
});
