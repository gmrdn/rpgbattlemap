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
