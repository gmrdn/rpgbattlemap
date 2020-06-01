import React from "react";
import { shallow } from "enzyme";
import { Room } from "../Room";
import Grid from "../../components/Grid";
import { Redirect } from "react-router-dom";

describe("Pages", () => {
  describe("Room", () => {
    it("renders a room page with a Grid when an id is provided in the parameters", () => {
      const wrapper = shallow(
        <Room
          match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
        ></Room>
      );
      expect(wrapper.find(Grid)).toExist();
    });

    it("redirects to / when no id is found in the parameters", () => {
      const wrapper = shallow(
        <Room
          match={{ params: { id: "" }, isExact: true, path: "", url: "" }}
        ></Room>
      );
      expect(wrapper.find(Redirect)).toExist();
      expect(wrapper.find(Redirect).prop("to")).toBe("/");
    });

    it("redirects to /joinroom when the nickname prop is empty", () => {
      const setRoomId = jest.fn();
      const props = {
        nickname: "",
        setRoomId: setRoomId,
      };

      const wrapper = shallow(
        <Room
          {...props}
          match={{ params: { id: "1" }, isExact: true, path: "", url: "" }}
        ></Room>
      );
      expect(wrapper.find(Redirect)).toExist();
      expect(wrapper.find(Redirect).prop("to")).toBe("/joinroom/1");
    });
  });
});
