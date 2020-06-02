import React from "react";
import { shallow } from "enzyme";
import Dicetray from "../Dicetray";
import Dice from "../Dice";

describe("Components", () => {
  describe("Dicetray", () => {
    it("renders some dice", () => {
      const wrapper = shallow(<Dicetray></Dicetray>);
      expect(wrapper.find(Dice)).toExist();
    });
  });
});
