import reducer from ".";
describe("Redux", () => {
  describe("Reducer", () => {
    describe("Initial State", () => {
      it("returns the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
          nickname: "",
          roomId: "",
          tokens: [],
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
        });
      });
    });
    describe("RoomId", () => {
      it("handles SET_ROOMID", () => {
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
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
          tokens: [],
        });
      });
    });

    describe("Nickname", () => {
      it("handles SET_NICKNAME", () => {
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
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
          tokens: [],
        });
      });
    });

    describe("Dialogs", () => {
      it("handles OPEN_DELETE_TOKEN_DIALOG", () => {
        expect(
          reducer(
            {},
            {
              type: "OPEN_DELETE_TOKEN_DIALOG",
              open: true,
            }
          )
        ).toEqual({
          nickname: "",
          roomId: "",
          deleteTokenDialogOpen: true,
          newTokenDialogOpen: false,
          tokens: [],
        });
      });

      it("handles OPEN_NEW_TOKEN_DIALOG", () => {
        expect(
          reducer(
            {},
            {
              type: "OPEN_NEW_TOKEN_DIALOG",
              open: true,
            }
          )
        ).toEqual({
          nickname: "",
          roomId: "",
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: true,
          tokens: [],
        });
      });
    });

    describe("Tokens", () => {
      it("handles ADD_TOKEN", () => {
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
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
          tokens: [
            {
              _id: "54321abcd",
              x: 1,
              y: 1,
              image: undefined,
              color: "green",
              name: "Jest Token 1",
              selected: false,
              toBeDeleted: false,
            },
          ],
        });
      });

      it("handles RESET_TOKENS", () => {
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
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
          tokens: [],
        });
      });

      it("handles SELECT_TOKEN when no token is selected", () => {
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
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
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

      it("handles SELECT_TOKEN when one token is already selected", () => {
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
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
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

      it("handles UNSELECT_TOKENS when one token is already selected", () => {
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
              type: "UNSELECT_TOKENS",
            }
          )
        ).toEqual({
          nickname: "",
          roomId: "",
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
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
        });
      });

      it("handles MOVE_TOKEN", () => {
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
              tokenId: "54321abcd",
              newPosition: {
                x: 21,
                y: 22,
              },
            }
          )
        ).toEqual({
          nickname: "",
          roomId: "",
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
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

      it("handles DELETE_TOKEN", () => {
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
              type: "DELETE_TOKEN",
              tokenId: "54321abcd",
            }
          )
        ).toEqual({
          nickname: "",
          roomId: "",
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
          tokens: [
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
      it("handles PREPARE_DELETE_TOKENS", () => {
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
                  toBeDeleted: false,
                },
                {
                  _id: "12345zyxw",
                  x: 3,
                  y: 4,
                  image: "2.png",
                  color: "blue",
                  name: "Jest Token 2",
                  selected: false,
                  toBeDeleted: false,
                },
                {
                  _id: "66666aacc",
                  x: 5,
                  y: 6,
                  image: "3.png",
                  color: "red",
                  name: "Jest Token 3",
                  selected: false,
                  toBeDeleted: false,
                },
              ],
            },
            {
              type: "PREPARE_DELETE_TOKENS",
              tokenIds: ["54321abcd", "12345zyxw"],
            }
          )
        ).toEqual({
          nickname: "",
          roomId: "",
          deleteTokenDialogOpen: false,
          newTokenDialogOpen: false,
          tokens: [
            {
              _id: "54321abcd",
              x: 1,
              y: 2,
              image: undefined,
              color: "green",
              name: "Jest Token 1",
              selected: true,
              toBeDeleted: true,
            },
            {
              _id: "12345zyxw",
              x: 3,
              y: 4,
              image: "2.png",
              color: "blue",
              name: "Jest Token 2",
              selected: false,
              toBeDeleted: true,
            },
            {
              _id: "66666aacc",
              x: 5,
              y: 6,
              image: "3.png",
              color: "red",
              name: "Jest Token 3",
              selected: false,
              toBeDeleted: false,
            },
          ],
        });
      });
    });
  });
});
