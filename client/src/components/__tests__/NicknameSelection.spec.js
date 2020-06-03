import React from "react";
import { shallow } from "enzyme";
import { NicknameSelection } from "../NicknameSelection";
import { NavLink } from "react-router-dom";

describe("Components", () => {
  describe("Nickname Selection", () => {
    it("saves the nickname in redux store", () => {
      const setUserName = jest.fn();
      const wrapper = shallow(
        <NicknameSelection
          roomId="123"
          setUserName={setUserName}
        ></NicknameSelection>
      );
      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "Nickname" } });
      const btn = wrapper.find(NavLink);
      btn.simulate("click");
      expect(setUserName).toHaveBeenCalledWith("Nickname");
    });

    it("navigates to /room/id", () => {
      const setUserName = jest.fn();
      const wrapper = shallow(
        <NicknameSelection
          roomId="123"
          setUserName={setUserName}
        ></NicknameSelection>
      );
      expect(wrapper.find(NavLink).prop("to")).toEqual({
        pathname: "/room/123",
      });
    });
  });
});
