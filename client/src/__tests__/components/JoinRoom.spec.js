import React from "react";
import { shallow } from "enzyme";
import { JoinRoom } from "../../components/JoinRoom";

describe("Components", () => {
  describe("JoinRoom", () => {
    it("updates the state", () => {
      const updateReduxState = jest.fn();
      const wrapper = shallow(<JoinRoom setRoomId={updateReduxState} />);
      const input = wrapper.find("input");
      input.simulate("change", { target: { value: 2 } });
      expect(updateReduxState).toHaveBeenCalled();
    });
  });
});
