import React from "react";
import { shallow } from "enzyme";
import DrawingToolbar from "../../components/DrawingToolbar";

describe("Components", () => {
  describe("DrawingToolbar", () => {
    it("contains a pen tool", () => {
      const wrapper = shallow(<DrawingToolbar></DrawingToolbar>);
      expect(wrapper.find("#tools-pen")).toExist();
    });
  });
});
