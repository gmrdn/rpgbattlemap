import React from "react";
import { shallow } from "enzyme";
import { JoinRoom } from "../../components/JoinRoom";

describe("Components", () => {
  describe("JoinRoom", () => {
    it("updates the local state on change", () => {
      const wrapper = shallow(<JoinRoom />);
      const input = wrapper.find("input");
      input.simulate("change", { target: { value: 2 } });
      expect(wrapper.state("roomId")).toBe(2);
    });

    it("updates the global state on submit", () => {
      const updateReduxState = jest.fn();
      const wrapper = shallow(<JoinRoom setRoomId={updateReduxState} />);
      const form = wrapper.find("form");
      form.simulate("submit", {
        preventDefault: () => {},
      });
      expect(updateReduxState).toHaveBeenCalled();
    });
  });
});
