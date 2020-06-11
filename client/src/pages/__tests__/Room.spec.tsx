import React from "react";
import { shallow } from "enzyme";
import { Room } from "../Room";
import Grid from "../../components/Grid";
import { Redirect } from "react-router-dom";
import { match } from "react-router";
import { createMemoryHistory, createLocation } from "history";

const history = createMemoryHistory();
const setUserName = jest.fn();
const setRoomId = jest.fn();
const nickname = "Jest User";
const roomId = "51314487";

describe("Pages", () => {
  describe("Room", () => {
    it("renders a room page with a Grid when an id is provided in the parameters", () => {
      const match: match<{ id: string }> = {
        params: { id: "1" },
        isExact: true,
        path: "",
        url: "",
      };
      const location = createLocation(match.url);

      const wrapper = shallow(
        <Room
          match={match}
          nickname={nickname}
          roomId={roomId}
          history={history}
          location={location}
          setRoomId={setRoomId}
          setUserName={setUserName}
        ></Room>
      );
      expect(wrapper.find(Grid)).toExist();
    });

    it("redirects to / when no id is found in the parameters", () => {
      const match: match<{ id: string }> = {
        params: { id: "" },
        isExact: true,
        path: "",
        url: "",
      };
      const location = createLocation(match.url);

      const wrapper = shallow(
        <Room
          match={match}
          nickname={nickname}
          roomId={roomId}
          history={history}
          location={location}
          setRoomId={setRoomId}
          setUserName={setUserName}
        ></Room>
      );
      expect(wrapper.find(Redirect)).toExist();
      expect(wrapper.find(Redirect).prop("to")).toBe("/");
    });

    it("redirects to /joinroom when the nickname prop is empty", () => {
      const match: match<{ id: string }> = {
        params: { id: "1" },
        isExact: true,
        path: "",
        url: "",
      };
      const location = createLocation(match.url);

      let nickname = "";

      const wrapper = shallow(
        <Room
          match={match}
          nickname={nickname}
          roomId={roomId}
          history={history}
          location={location}
          setRoomId={setRoomId}
          setUserName={setUserName}
        ></Room>
      );
      expect(wrapper.find(Redirect)).toExist();
      expect(wrapper.find(Redirect).prop("to")).toBe("/joinroom/1");
    });
  });
});
