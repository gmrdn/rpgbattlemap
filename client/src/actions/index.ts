interface Token {
  _id: string;
  x: number;
  y: number;
  name: string;
  color: string;
  image: string;
}

export function setUserName(nickname: string) {
  return {
    type: "SET_NICKNAME",
    nickname,
  };
}

export function setRoomId(roomId: string) {
  return {
    type: "SET_ROOMID",
    roomId,
  };
}

export function addToken(token: Token) {
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

export function selectToken(tokenId: string) {
  return {
    type: "SELECT_TOKEN",
    tokenId,
  };
}

export function deleteToken(tokenId: string) {
  return {
    type: "DELETE_TOKEN",
    tokenId,
  };
}

export function moveToken(tokenId: string, newPosition: Position) {
  return {
    type: "MOVE_TOKEN",
    tokenId,
    newPosition,
  };
}

export function prepareDeleteTokens(tokenIds: string[]) {
  return {
    type: "PREPARE_DELETE_TOKENS",
    tokenIds,
  };
}

export function openDeleteTokenDialog(open: boolean) {
  return {
    type: "OPEN_DELETE_TOKEN_DIALOG",
    open: open,
  };
}

export function openNewTokenDialog(open: boolean) {
  return {
    type: "OPEN_NEW_TOKEN_DIALOG",
    open: open,
  };
}
