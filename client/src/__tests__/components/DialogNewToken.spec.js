import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { DialogNewToken } from "../../components/DialogNewToken";

let wrapper;
describe("Components", () => {
  describe("DialogNewToken", () => {
    beforeEach(() => {
      wrapper = shallow(<DialogNewToken />);
    });

    it("updates the local state on name change", () => {
      const input = wrapper.find("input#txt-token-name");
      act(() => {
        input.simulate("change", { target: { value: 2 } });
      });
      expect(wrapper.state("tokenName")).toBe(2);
    });

    it("updates the local state on color change", () => {
      const input = wrapper.find("input#txt-token-color");
      act(() => {
        input.simulate("change", { target: { value: 2 } });
      });
      expect(wrapper.state("tokenColor")).toBe(2);
    });

    it("updates the local state on image change", () => {
      const input = wrapper.find("input#image-range");
      act(() => {
        input.simulate("change", { target: { value: 2 } });
      });
      expect(wrapper.state("tokenImage")).toBe("2.png");
    });
  });
});
