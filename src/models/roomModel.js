import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatMessage = new Schema({
  nickname: String,
  message: String,
});

const Token = new Schema({
  x: Number,
  y: Number,
  name: String,
  color: String,
  image: String,
});

const Grid = new Schema({
  name: String,
  background: String,
  tokens: [Token],
});

export const RoomSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now,
  },
  chatMessages: [ChatMessage],
  grid: Grid,
});
