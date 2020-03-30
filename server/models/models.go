package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ChatMessage struct {
	Nickname string `json:"nickname" bson:"nickname"`
	Message  string `json:"message" bson:"message"`
}

type Grid struct {
	Name   string   `json:"name" bson:"name"`
	Tokens []string `json:"tokens" bson:"tokens"`
}

type Room struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	RoomID       string             `json:"roomid" bson:"roomid"`
	CreationDate string             `json:"creationdate,omitempty" bson:"creationdate,omitempty"`
	ChatMessages []ChatMessage      `json:"chatmessages,omitempty" bson:"chatmessages,omitempty"`
	Grid         Grid               `json:"grid" bson:"grid"`
}
