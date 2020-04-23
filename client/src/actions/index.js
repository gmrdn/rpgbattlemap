export function setUserName(nickname) {
  return {
    type: "SET_NICKNAME",
    nickname,
  };
}

export function setRoomId(roomId) {
  return {
    type: "SET_ROOMID",
    roomId,
  };
}

export function addToken(token) {
  return {
    type: "ADD_TOKEN",
    _id: token._id,
    x: token.x,
    y: token.y,
    name: token.name,
    color: token.color,
    image: token.image,
  };
}

export function resetTokens() {
  return {
    type: "RESET_TOKENS",
  };
}

export function selectToken(tokenId) {
  return {
    type: "SELECT_TOKEN",
    tokenId,
  };
}

export function moveToken(token, newPosition) {
  return {
    type: "MOVE_TOKEN",
    token,
    newPosition,
  };
}
