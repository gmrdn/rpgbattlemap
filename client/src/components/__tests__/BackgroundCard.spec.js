import React from "react";
import { shallow } from "enzyme";
import BackgroundCard from "../BackgroundCard";

describe("Components", () => {
  describe("Background Card", () => {
    it("renders a card with the background image from the props", () => {
      const props = {
        id: "123",
        image: "image.png",
        label: "Background label",
      };
      const wrapper = shallow(<BackgroundCard {...props}></BackgroundCard>);
      expect(wrapper.find(".card")).toHaveText("Background label");
    });
  });
});
