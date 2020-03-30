package router

import (
	"../middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/room", middleware.GetAllRoom).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/room", middleware.CreateRoom).Methods("POST", "OPTIONS")
	// router.HandleFunc("/api/room/{id}", middleware.RoomComplete).Methods("PUT", "OPTIONS")
	// router.HandleFunc("/api/undoRoom/{id}", middleware.UndoRoom).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteRoom/{id}", middleware.DeleteRoom).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAllRoom", middleware.DeleteAllRoom).Methods("DELETE", "OPTIONS")
	// endpoints used by the actual react app
	router.HandleFunc("/api/chatlogs/{id}", middleware.GetChatLogs).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/grid/{id}", middleware.GetGrid).Methods("GET", "OPTIONS")

	return router
}
