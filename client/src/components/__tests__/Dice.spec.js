import React from "react";
import { shallow } from "enzyme";
import Dice from "../Dice";

describe("Components", () => {
  describe("Dice", () => {
    it("renders a dice", () => {
      const wrapper = shallow(<Dice dice="d6"></Dice>);
      expect(wrapper.find("button")).toExist();
      expect(wrapper.find("button")).toHaveText("d6");
    });
  });
});
