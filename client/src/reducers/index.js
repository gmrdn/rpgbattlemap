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
          x: action.x,
          y: action.y,
          name: action.name,
          color: action.color,
          image: action.image,
        },
      ];
    case "RESET_TOKENS":
      return [];
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
