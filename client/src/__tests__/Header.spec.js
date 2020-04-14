import React from "react";
import { shallow } from "enzyme";

import { Header } from "../components/Header";

describe("components", () => {
  describe("Header", () => {
    it("should render self and subcomponents", () => {
      // const enzymeWrapper = shallow(<Header />);
      const props = {
        nickname: "Enzyme User",
        roomId: "ABCDEFG",
      };
      const enzymeWrapper = shallow(<Header {...props} />);
      expect(enzymeWrapper.find("header").hasClass("header")).toBe(true);

      expect(enzymeWrapper.find("#nav-home").text()).toBe("RPG Battle Map");
      expect(enzymeWrapper.find("#nav-room-selection").text()).toBe(
        "Room Selection"
      );
      expect(enzymeWrapper.find("#header-nickname").text()).toBe("Enzyme User");
      expect(enzymeWrapper.find("#header-room-id").text()).toBe("ABCDEFG");
    });

    // it("should display the current user name", () => {});
  });
});
