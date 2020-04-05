import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatMessage = new Schema({
  nickname: String,
  message: String
});

const Token = new Schema({
  pos_x: Number,
  pos_y: Number,
  represents: String
});

const Grid = new Schema({
  name: String,
  tokens: [Token]
});

export const RoomSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  chatMessages: [ChatMessage],
  grid: Grid
});
