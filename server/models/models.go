package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ChatMessage struct {
	Nickname string             `json:"nickname, omitempty" bson:"nickname, omitempty"`
	Message  string             `json:"message, omitempty" bson:"message, omitempty"`
}

type Room struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	RoomID       string             `json:"roomid, omitempty" bson:"roomid, omitempty"`
	ChatMessages []ChatMessage      `json:"chatmessages,omitempty" bson:"chatmessages,omitempty"`
	CreationDate string             `json:"creationdate,omitempty" bson:"creationdate,omitempty"`
}
