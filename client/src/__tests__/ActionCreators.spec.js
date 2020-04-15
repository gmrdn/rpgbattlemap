import * as actions from "../actions";

describe("actions", () => {
  it("should create an action to set a nickname", () => {
    const nickname = "Jest User";
    const expectedAction = {
      type: "SET_NICKNAME",
      nickname,
    };
    expect(actions.setUserName(nickname)).toEqual(expectedAction);
  });

  it("should create an action to set a roomId", () => {
    const roomId = "ABCDEFGH";
    const expectedAction = {
      type: "SET_ROOMID",
      roomId,
    };
    expect(actions.setRoomId(roomId)).toEqual(expectedAction);
  });

  it("should create an action to add a token", () => {
    const token = { x: 1, y: 1, color: "00F", name: "Jest Token" };
    const expectedAction = {
      type: "ADD_TOKEN",
      x: token.x,
      y: token.y,
      name: token.name,
      color: token.color,
    };
    expect(actions.addToken(token)).toEqual(expectedAction);
  });
});
