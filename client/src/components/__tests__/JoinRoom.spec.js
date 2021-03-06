import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { JoinRoom } from "../JoinRoom";

describe("Components", () => {
  describe("JoinRoom", () => {
    it("updates the local state on change", () => {
      const wrapper = shallow(<JoinRoom />);
      const input = wrapper.find("input");
      act(() => {
        input.simulate("change", { target: { value: 2 } });
      });
      expect(wrapper.state("roomId")).toBe(2);
    });

    it("updates the global state on submit", () => {
      const updateReduxState = jest.fn();
      const wrapper = shallow(<JoinRoom setRoomId={updateReduxState} />);
      const form = wrapper.find("form");
      act(() => {
        form.simulate("submit", {
          preventDefault: () => {},
        });
      });
      expect(updateReduxState).toHaveBeenCalled();
    });
  });
});
