import * as types from "../constants/ActionTypes";

export function setUserName(nickname) {
  return {
    type: types.SET_NICKNAME,
    nickname,
  };
}

export function setRoomId(roomId) {
  return {
    type: types.SET_ROOMID,
    roomId,
  };
}
