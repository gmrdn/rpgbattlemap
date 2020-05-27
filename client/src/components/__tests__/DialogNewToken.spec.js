import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { DialogNewToken } from "../DialogNewToken";

let wrapper;
describe("Components", () => {
  describe("DialogNewToken", () => {
    describe("Form", () => {
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
    describe("Close", () => {
      it("closes the popup on cancel", () => {
        const updateReduxState = jest.fn();
        wrapper = shallow(
          <DialogNewToken openNewTokenDialog={updateReduxState} />
        );
        const button = wrapper.find("#btn-cancel");
        act(() => {
          button.simulate("click");
        });
        expect(updateReduxState).toHaveBeenCalledWith(false);
      });

      it("closes the popup on confirm", () => {
        const updateReduxState = jest.fn();
        const socket = { emit: jest.fn(), on: jest.fn() };

        wrapper = shallow(
          <DialogNewToken
            openNewTokenDialog={updateReduxState}
            socket={socket}
          />
        );
        const button = wrapper.find("#btn-confirm");
        act(() => {
          button.simulate("click");
        });
        expect(updateReduxState).toHaveBeenCalledWith(false);
      });
    });

    describe("Create a token", () => {
      it("emits a socket to create the token", () => {
        const updateReduxState = jest.fn();
        const socket = { emit: jest.fn(), on: jest.fn() };
        const roomId = "1234567890";
        const nickname = "Jest User";
        const newToken = {
          name: "",
          x: 1,
          y: 1,
          color: "grey",
          image: "32.png",
        };

        wrapper = shallow(
          <DialogNewToken
            openNewTokenDialog={updateReduxState}
            socket={socket}
            roomId={roomId}
            nickname={nickname}
          />
        );
        const button = wrapper.find("#btn-confirm");
        act(() => {
          button.simulate("click");
        });
        expect(socket.emit).toHaveBeenCalled();
        expect(socket.emit.mock.calls[0]).toMatchObject([
          "addToken",
          { user: nickname, room: roomId, token: newToken },
        ]);
      });
    });
  });
});
