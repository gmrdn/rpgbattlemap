import reducer from "../reducers";

describe("Session reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      nickname: "",
      roomId: "",
      tokens: [],
    });
  });

  it("should handle SET_NICKNAME", () => {
    expect(
      reducer(
        {},
        {
          type: "SET_NICKNAME",
          nickname: "Jest User",
        }
      )
    ).toEqual({
      nickname: "Jest User",
      roomId: "",
      tokens: [],
    });
  });

  it("should handle SET_ROOMID", () => {
    expect(
      reducer(
        {},
        {
          type: "SET_ROOMID",
          roomId: "ABCDEFG",
        }
      )
    ).toEqual({
      nickname: "",
      roomId: "ABCDEFG",
      tokens: [],
    });
  });

  it("should handle ADD_TOKEN", () => {
    const token1 = { x: 1, y: 1, color: "green", name: "Jest Token 1" };
    const token2 = { x: 99, y: 99, color: "red", name: "Jest Token 2" };

    expect(
      reducer(
        {},
        {
          type: "ADD_TOKEN",
          x: token1.x,
          y: token1.y,
          name: token1.name,
          color: token1.color,
        }
      )
    ).toEqual({
      nickname: "",
      roomId: "",
      tokens: [token1],
    });
  });
});
