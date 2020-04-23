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
    case "MOVE_TOKEN":
      return state.map((token) => {
        if (token._id === action.token._id) {
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
    tokens: tokens(state.tokens, action),
  };
}
