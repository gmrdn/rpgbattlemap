import React from "react";
import { shallow } from "enzyme";
import EnterButton from "./EnterButton";
import Button from "@material-ui/core/Button";

describe("Components", () => {
  describe("Enter Button", () => {
    it("displays a button with a text as parameter", () => {
      const wrapper = shallow(<EnterButton text="Enter"></EnterButton>);
      expect(wrapper.find(Button)).toExist();
      expect(wrapper.find(Button)).toHaveText("Enter");
    });
  });
});
