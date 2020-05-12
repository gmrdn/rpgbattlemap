import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/Home";
import RoomCreation from "../../pages/RoomCreation";
import RoomSelection from "../../pages/RoomSelection";
import RoomJoining from "../../pages/RoomJoining";
import Room from "../../pages/Room";
const rrd = require("react-router-dom");

rrd.BrowserRouter = ({ children }) => <div>{children}</div>;

const store = createStore(rootReducer);

let wrapper;
describe("App", () => {
  describe("Routes", () => {
    it("displays the room creation page at /createroom", async () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/createroom"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(RoomCreation)).toHaveLength(1);
    });

    it("displays the room selection page at /roomselection", async () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/roomselection"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(RoomSelection)).toHaveLength(1);
    });

    it("displays the room joining page at /joinroom", async () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/joinroom/5eb3022bdf798cc340426118"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(RoomJoining)).toHaveLength(1);
    });

    it("displays the home page when no roomId is provided at /joinroom", async () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/joinroom"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(RoomJoining)).toHaveLength(0);
    });

    it("displays the room joining page at /room when no nickname is provided", async () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/room/5eb3022bdf798cc340426118"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(Room)).toHaveLength(0);
      expect(wrapper.find(RoomJoining)).toHaveLength(1);
    });

    it("displays the home page at /room when no roomId is provided", async () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/room"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(Room)).toHaveLength(0);
      expect(wrapper.find(RoomJoining)).toHaveLength(0);
    });

    it("displays the room page at /room", async () => {
      const states = {
        nickname: "Jest User",
        roomId: "",
        tokens: [],
        deleteTokenDialogOpen: false,
        newTokenDialogOpen: false,
      };
      const storeWithNickname = createStore(rootReducer, states);

      wrapper = mount(
        <Provider store={storeWithNickname}>
          <MemoryRouter initialEntries={["/room"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(Room)).toHaveLength(0);
      expect(wrapper.find(RoomJoining)).toHaveLength(0);
    });
  });
});
