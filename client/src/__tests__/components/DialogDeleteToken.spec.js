import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { DialogDeleteToken } from "../../components/DialogDeleteToken";

let wrapper;

const tokens = [
  {
    _id: "1111111111",
    x: 1,
    y: 1,
    name: "Mock Token selected and to be deleted",
    toBeDeleted: true,
    selected: true,
  },
  {
    _id: "2222222222",
    x: 1,
    y: 1,
    name: "Mock Token not selected but to be deleted",
    toBeDeleted: true,
    selected: false,
  },
  {
    _id: "3333333333",
    x: 1,
    y: 1,
    name: "Mock Token not selected and not to be deleted",
    toBeDeleted: false,
    selected: false,
  },
];

describe("Components", () => {
  describe("DialogDeleteToken", () => {
    describe("Close", () => {
      it("closes the popup on cancel", () => {
        const updateReduxState = jest.fn();
        wrapper = shallow(
          <DialogDeleteToken
            tokens={tokens}
            openDeleteTokenDialog={updateReduxState}
          />
        );
        const button = wrapper.find("#btn-cancel");
        act(() => {
          button.simulate("click");
        });
        expect(updateReduxState).toHaveBeenCalledWith(false);
      });

      it("closes the popup on confirm", () => {
        const openDeleteTokenDialog = jest.fn();
        const deleteToken = jest.fn();
        const socket = { emit: jest.fn(), on: jest.fn() };

        wrapper = shallow(
          <DialogDeleteToken
            tokens={tokens}
            openDeleteTokenDialog={openDeleteTokenDialog}
            deleteToken={deleteToken}
            socket={socket}
          />
        );
        const button = wrapper.find("#btn-confirm");
        act(() => {
          button.simulate("click", {
            preventDefault: () => {},
          });
        });
        expect(openDeleteTokenDialog).toHaveBeenCalledWith(false);
      });
    });

    describe("Delete a token", () => {
      it("emits a socket to create the token", () => {
        const openDeleteTokenDialog = jest.fn();
        const deleteToken = jest.fn();
        const socket = { emit: jest.fn(), on: jest.fn() };
        const roomId = "1234567890";
        const nickname = "Jest User";

        wrapper = shallow(
          <DialogDeleteToken
            openDeleteTokenDialog={openDeleteTokenDialog}
            deleteToken={deleteToken}
            tokens={tokens}
            socket={socket}
            roomId={roomId}
            nickname={nickname}
          />
        );
        const button = wrapper.find("#btn-confirm");
        act(() => {
          button.simulate("click", {
            preventDefault: () => {},
          });
        });
        expect(deleteToken).toHaveBeenCalledTimes(2);
        expect(deleteToken).toHaveBeenCalledWith("1111111111");
        expect(deleteToken).toHaveBeenCalledWith("2222222222");
        expect(socket.emit).toHaveBeenCalledTimes(2);
        expect(socket.emit.mock.calls[0]).toMatchObject([
          "deleteToken",
          { user: nickname, room: roomId, tokenId: "1111111111" },
        ]);
        expect(socket.emit.mock.calls[1]).toMatchObject([
          "deleteToken",
          { user: nickname, room: roomId, tokenId: "2222222222" },
        ]);
      });
    });
  });
});
