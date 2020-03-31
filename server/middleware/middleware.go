package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"../models"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var connectionString = "mongodb+srv://admin:" + os.Getenv("MONGOPWD") + "@dndbattlemap-1236i.mongodb.net/test?retryWrites=true&w=majority"

const dbName = "dev"
const collName = "rooms"

var collection *mongo.Collection

func init() {
	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database(dbName).Collection(collName)

	fmt.Println("Collection instance created!")
}

func GetAllRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := getAllRoom()
	json.NewEncoder(w).Encode(payload)
}

func GetChatLogs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	payload := getChatlogs(params["id"])
	json.NewEncoder(w).Encode(payload)
}

func GetGrid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	payload := getGrid(params["id"])
	json.NewEncoder(w).Encode(payload)
}

func CreateRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var room models.Room
	_ = json.NewDecoder(r.Body).Decode(&room)
	insertOneRoom(room)
	json.NewEncoder(w).Encode(room)
}

func RoomComplete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	roomComplete(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func UndoRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	undoRoom(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func DeleteRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	deleteOneRoom(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func DeleteAllRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	count := deleteAllRoom()
	json.NewEncoder(w).Encode(count)
}

func getAllRoom() []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		results = append(results, result)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}

func getChatlogs(room string) []models.ChatMessage {
	fmt.Println(room)
	id, _ := primitive.ObjectIDFromHex(room)
	filter := bson.M{"_id": id}

	var results models.Room
	err := collection.FindOne(context.Background(), filter).Decode(&results)
	if err != nil {
		log.Fatal(err)
	}
	var chatmessages []models.ChatMessage 
	chatmessages = results.ChatMessages
	return chatmessages
}

func getGrid(room string) models.Grid {
	fmt.Println(room)
	id, _ := primitive.ObjectIDFromHex(room)
	filter := bson.M{"_id": id}

	var results models.Room
	err := collection.FindOne(context.Background(), filter).Decode(&results)
	if err != nil {
		log.Fatal(err)
	}
	var grid models.Grid
	grid = results.Grid
	return grid
}

func insertOneRoom(room models.Room) {
	insertResult, err := collection.InsertOne(context.Background(), room)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
}

func roomComplete(room string) {
	fmt.Println(room)
	id, _ := primitive.ObjectIDFromHex(room)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": true}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", result.ModifiedCount)
}

func undoRoom(room string) {
	fmt.Println(room)
	id, _ := primitive.ObjectIDFromHex(room)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": false}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("modified count: ", result.ModifiedCount)
}

func deleteOneRoom(room string) {
	fmt.Println(room)
	id, _ := primitive.ObjectIDFromHex(room)
	filter := bson.M{"_id": id}
	d, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Deleted Document", d.DeletedCount)
}

func deleteAllRoom() int64 {
	d, err := collection.DeleteMany(context.Background(), bson.D{{}}, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Deleted Document", d.DeletedCount)
	return d.DeletedCount
}


// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	// We'll need to check the origin of our connection
	// this will allow us to make requests from our React
	// development server to here.
	// For now, we'll do no checking and just allow any connection
	CheckOrigin: func(r *http.Request) bool { return true },
}

// define a reader which will listen for
// new messages being sent to our WebSocket
// endpoint
func reader(conn *websocket.Conn) {
	for {
		// read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// print out that message for clarity
		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}

// define our WebSocket endpoint
func ServeWs(w http.ResponseWriter, r *http.Request) {
    fmt.Println(r.Host)

  // upgrade this connection to a WebSocket
  // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
  }
  // listen indefinitely for new messages coming
  // through on our WebSocket connection
    reader(ws)
}
