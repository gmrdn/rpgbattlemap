import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../src/reducers";

const store = createStore(rootReducer);

const StoreDecorator = (storyFn) => (
  <Provider store={store}>{storyFn()} </Provider>
);

export default StoreDecorator;
