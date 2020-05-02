function nickname(state = "", action) {
  switch (action.type) {
    case "SET_NICKNAME":
      return action.nickname;
    default:
      return state;
  }
}

function roomId(state = "", action) {
  switch (action.type) {
    case "SET_ROOMID":
      return action.roomId;
    default:
      return state;
  }
}

function deleteTokenDialogOpen(state = false, action) {
  switch (action.type) {
    case "OPEN_DELETE_TOKEN_DIALOG":
      return true;
    default:
      return state;
  }
}

function newTokenDialogOpen(state = false, action) {
  switch (action.type) {
    case "OPEN_NEW_TOKEN_DIALOG":
      return true;
    default:
      return state;
  }
}

function tokens(state = [], action) {
  switch (action.type) {
    case "ADD_TOKEN":
      return [
        ...state,
        {
          _id: action._id,
          x: action.x,
          y: action.y,
          name: action.name,
          color: action.color,
          image: action.image,
          selected: false,
        },
      ];
    case "RESET_TOKENS":
      return [];
    case "SELECT_TOKEN":
      return state.map((token) => {
        if (token._id === action.tokenId) {
          return {
            ...token,
            selected: true,
          };
        } else {
          return {
            ...token,
            selected: false,
          };
        }
      });
    case "DELETE_TOKEN":
      return state.filter((token) => {
        return token._id !== action.tokenId;
      });
    case "MOVE_TOKEN":
      return state.map((token) => {
        if (token._id === action.tokenId) {
          return {
            ...token,
            x: action.newPosition.x,
            y: action.newPosition.y,
          };
        } else {
          return { ...token };
        }
      });
    default:
      return state;
  }
}

export default function session(state = {}, action) {
  return {
    nickname: nickname(state.nickname, action),
    roomId: roomId(state.roomId, action),
    deleteTokenDialogOpen: deleteTokenDialogOpen(
      state.deleteTokenDialogOpen,
      action
    ),
    newTokenDialogOpen: newTokenDialogOpen(state.newTokenDialogOpen, action),
    tokens: tokens(state.tokens, action),
  };
}
