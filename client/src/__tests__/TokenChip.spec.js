import React from "react";
import { shallow } from "enzyme";
import { TokenChip } from "../components/TokenChip";
import Chip from "@material-ui/core/Chip";

describe("TokenChip", () => {
  describe("renders a selected or unselected chip", () => {
    it("renders an unselected token chip", () => {
      const token = {
        _id: "1234567890",
        x: 1,
        y: 1,
        image: "1.png",
        color: "red",
        name: "Jest Token",
        selected: false,
      };

      const wrapper = shallow(<TokenChip token={token} />);

      expect(wrapper.find(Chip).prop("label")).toBe("Jest Token");
      expect(wrapper.find(Chip).prop("color")).toBe("default");
    });

    it("renders a selected token chip", () => {
      const token = {
        x: 1,
        y: 1,
        image: "1.png",
        color: "red",
        name: "Jest Token",
        selected: true,
      };

      const wrapper = shallow(<TokenChip token={token} />);

      expect(wrapper.find(Chip).prop("label")).toBe("Jest Token");
      expect(wrapper.find(Chip).prop("color")).toBe("primary");
    });
  });
});
