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

export function deleteToken(tokenId) {
  return {
    type: "DELETE_TOKEN",
    tokenId,
  };
}

export function moveToken(tokenId, newPosition) {
  return {
    type: "MOVE_TOKEN",
    tokenId,
    newPosition,
  };
}

export function prepareDeleteTokens(tokenIds) {
  return {
    type: "PREPARE_DELETE_TOKENS",
    tokenIds,
  };
}

export function openDeleteTokenDialog(tokenId) {
  return {
    type: "OPEN_DELETE_TOKEN_DIALOG",
    tokenId,
  };
}

export function openNewTokenDialog() {
  return {
    type: "OPEN_NEW_TOKEN_DIALOG",
  };
}
