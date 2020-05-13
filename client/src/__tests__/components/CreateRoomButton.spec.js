import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import CreateRoomButton from "../../components/CreateRoomButton";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("Components", () => {
  describe("CreateRoomButton", () => {
    it("renders a button to create a room", () => {
      let wrapper;
      act(() => {
        wrapper = mount(
          <Router>
            <CreateRoomButton />
          </Router>
        );
      });
      expect(wrapper.find(NavLink)).toHaveLength(1);
    });
  });
});
