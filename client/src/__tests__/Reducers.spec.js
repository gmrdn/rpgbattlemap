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
    const token1 = {
      _id: "54321abcd",
      x: 1,
      y: 1,
      color: "green",
      name: "Jest Token 1",
    };

    expect(
      reducer(
        {},
        {
          type: "ADD_TOKEN",
          _id: token1._id,
          x: token1.x,
          y: token1.y,
          name: token1.name,
          color: token1.color,
          selected: false,
        }
      )
    ).toEqual({
      nickname: "",
      roomId: "",
      tokens: [
        {
          _id: "54321abcd",
          x: 1,
          y: 1,
          image: undefined,
          color: "green",
          name: "Jest Token 1",
          selected: false,
        },
      ],
    });
  });

  it("should handle RESET_TOKENS", () => {
    expect(
      reducer(
        {},
        {
          type: "RESET_TOKENS",
        }
      )
    ).toEqual({
      nickname: "",
      roomId: "",
      tokens: [],
    });
  });

  it("should handle SELECT_TOKEN when no token is selected", () => {
    expect(
      reducer(
        {
          nickname: "",
          roomId: "",
          tokens: [
            {
              _id: "54321abcd",
              x: 1,
              y: 2,
              image: undefined,
              color: "green",
              name: "Jest Token 1",
              selected: false,
            },
            {
              _id: "12345zyxw",
              x: 3,
              y: 4,
              image: "2.png",
              color: "blue",
              name: "Jest Token 2",
              selected: false,
            },
          ],
        },
        {
          type: "SELECT_TOKEN",
          tokenId: "54321abcd",
        }
      )
    ).toEqual({
      nickname: "",
      roomId: "",
      tokens: [
        {
          _id: "54321abcd",
          x: 1,
          y: 2,
          image: undefined,
          color: "green",
          name: "Jest Token 1",
          selected: true,
        },
        {
          _id: "12345zyxw",
          x: 3,
          y: 4,
          image: "2.png",
          color: "blue",
          name: "Jest Token 2",
          selected: false,
        },
      ],
    });
  });

  it("should handle SELECT_TOKEN when one token is already selected", () => {
    expect(
      reducer(
        {
          nickname: "",
          roomId: "",
          tokens: [
            {
              _id: "54321abcd",
              x: 1,
              y: 2,
              image: undefined,
              color: "green",
              name: "Jest Token 1",
              selected: true,
            },
            {
              _id: "12345zyxw",
              x: 3,
              y: 4,
              image: "2.png",
              color: "blue",
              name: "Jest Token 2",
              selected: false,
            },
          ],
        },
        {
          type: "SELECT_TOKEN",
          tokenId: "12345zyxw",
        }
      )
    ).toEqual({
      nickname: "",
      roomId: "",
      tokens: [
        {
          _id: "54321abcd",
          x: 1,
          y: 2,
          image: undefined,
          color: "green",
          name: "Jest Token 1",
          selected: false,
        },
        {
          _id: "12345zyxw",
          x: 3,
          y: 4,
          image: "2.png",
          color: "blue",
          name: "Jest Token 2",
          selected: true,
        },
      ],
    });
  });

  it("should handle MOVE_TOKEN", () => {
    expect(
      reducer(
        {
          nickname: "",
          roomId: "",
          tokens: [
            {
              _id: "54321abcd",
              x: 1,
              y: 2,
              image: undefined,
              color: "green",
              name: "Jest Token 1",
              selected: true,
            },
            {
              _id: "12345zyxw",
              x: 3,
              y: 4,
              image: "2.png",
              color: "blue",
              name: "Jest Token 2",
              selected: false,
            },
          ],
        },
        {
          type: "MOVE_TOKEN",
          token: {
            _id: "54321abcd",
            x: 1,
            y: 2,
            image: undefined,
            color: "green",
            name: "Jest Token 1",
            selected: true,
          },
          newPosition: {
            x: 21,
            y: 22,
          },
        }
      )
    ).toEqual({
      nickname: "",
      roomId: "",
      tokens: [
        {
          _id: "54321abcd",
          x: 21,
          y: 22,
          image: undefined,
          color: "green",
          name: "Jest Token 1",
          selected: true,
        },
        {
          _id: "12345zyxw",
          x: 3,
          y: 4,
          image: "2.png",
          color: "blue",
          name: "Jest Token 2",
          selected: false,
        },
      ],
    });
  });
});
