package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ChatMessage struct {
	ID       primitive.ObjectID `bson:"_id, omitempty"`
	Nickname string             `bson:"nickname, omitempty"`
	Message  string             `bson:"message, omitempty"`
}

type Room struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	RoomID       string             `json:"roomid, omitempty"`
	ChatMessages []ChatMessage      `json:"chatmessages,omitempty"`
	CreationDate string             `json:"creationdate,omitempty"`
}
