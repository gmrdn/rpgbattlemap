import reducer from "../reducers";

describe("Session reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      nickname: "",
      roomId: "",
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
    });
  });
});
