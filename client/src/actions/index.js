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
    x: token.x,
    y: token.y,
    name: token.name,
    color: token.color,
    image: token.image,
  };
}
