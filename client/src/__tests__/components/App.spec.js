import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/Home";
import RoomCreation from "../../pages/RoomCreation";
import RoomSelection from "../../pages/RoomSelection";
import RoomJoining from "../../pages/RoomJoining";
import Room from "../../pages/Room";
import Header from "../../components/Header";
const rrd = require("react-router-dom");

rrd.BrowserRouter = ({ children }) => <div>{children}</div>;

jest.mock("../../components/Header", () => {
  const Header = () => <div />;
  return Header;
});
jest.mock("../../pages/Home", () => {
  const Home = () => <div />;
  return Home;
});
jest.mock("../../pages/RoomCreation", () => {
  const RoomCreation = () => <div />;
  return RoomCreation;
});
jest.mock("../../pages/RoomSelection", () => {
  const RoomSelection = () => <div />;
  return RoomSelection;
});
jest.mock("../../pages/RoomJoining", () => {
  const RoomJoining = () => <div />;
  return RoomJoining;
});
jest.mock("../../pages/Room", () => {
  const Room = () => <div />;
  return Room;
});

let wrapper;

describe("App", () => {
  describe("Routes", () => {
    it("displays the room creation page at /createroom", async () => {
      act(() => {
        wrapper = mount(
          <MemoryRouter initialEntries={["/createroom"]}>
            <App />
          </MemoryRouter>
        );
      });
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(RoomCreation)).toHaveLength(1);
    });

    it("displays the room selection page at /roomselection", async () => {
      act(() => {
        wrapper = mount(
          <MemoryRouter initialEntries={["/roomselection"]}>
            <App />
          </MemoryRouter>
        );
      });
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(RoomSelection)).toHaveLength(1);
    });

    it("displays the room joining page at /joinroom", async () => {
      act(() => {
        wrapper = mount(
          <MemoryRouter initialEntries={["/joinroom/5eb3022bdf798cc340426118"]}>
            <App />
          </MemoryRouter>
        );
      });
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(RoomJoining)).toHaveLength(1);
    });

    it("displays the home page when no roomId is provided at /joinroom", async () => {
      act(() => {
        wrapper = mount(
          <MemoryRouter initialEntries={["/joinroom"]}>
            <App />
          </MemoryRouter>
        );
      });
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(RoomJoining)).toHaveLength(0);
    });

    it("displays the home page at /room when no roomId is provided", async () => {
      act(() => {
        wrapper = mount(
          <MemoryRouter initialEntries={["/room"]}>
            <App />
          </MemoryRouter>
        );
      });
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(Room)).toHaveLength(0);
      expect(wrapper.find(RoomJoining)).toHaveLength(0);
    });

    it("displays the room page at /room", async () => {
      act(() => {
        wrapper = mount(
          <MemoryRouter initialEntries={["/room"]}>
            <App />
          </MemoryRouter>
        );
      });
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(Room)).toHaveLength(0);
      expect(wrapper.find(RoomJoining)).toHaveLength(0);
    });
  });
});
