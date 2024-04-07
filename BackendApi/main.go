package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// Set up HTTP server
	router := mux.NewRouter()
	router.HandleFunc("/create-user", CreateUser).Methods("POST")
	router.HandleFunc("/login-user", Loginuser).Methods("POST")
	router.HandleFunc("/update-points", UpdatePointsHandlers).Methods("POST")
	router.HandleFunc("/leaderboard/{username}", LeaderboardHandlers).Methods("GET")

	log.Println("Server listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
		handlers.AllowedHeaders([]string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"}),
	)(router)))
}
