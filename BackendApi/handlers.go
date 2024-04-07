package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Points struct {
	Username string `json:"username"`
	Points   int    `json:"points"`
}
type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

//create user

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Parse JSON request body into a User struct
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}
	//if user exist
	_, err = redisClient.HGet(ctx, newUser.Email, "users").Result()
	if err == nil {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}
	// Save user data to Redis
	err = saveUser(newUser)
	if err != nil {
		http.Error(w, "Failed to save user ", http.StatusInternalServerError)
		return
	}

	// Respond with success message
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}
func Loginuser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}
	val, err := redisClient.HGet(ctx, newUser.Email, "users").Result()
	if err != nil {
		http.Error(w, "User not exists", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(val))
}

// Endpoint to update user points when a game is won
func UpdatePointsHandlers(w http.ResponseWriter, r *http.Request) {
	// Decode request body to get the username of the winner
	var winner Points
	if err := json.NewDecoder(r.Body).Decode(&winner); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update user points in Redis
	if err := UpdateUserPoints(winner.Username); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return success response
	w.WriteHeader(http.StatusOK)
}

// Endpoint to retrieve the leaderboard
func LeaderboardHandlers(w http.ResponseWriter, r *http.Request) {
	// Retrieve leaderboard from Redis
	params := mux.Vars(r)
	username := params["username"]
	leaderboard, err := GetLeaderboard()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	point := leaderboard[username]

	// Encode leaderboard as JSON and return
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(point); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// Function to update user points in Redis
func UpdateUserPoints(username string) error {
	// Increment user points in Redis
	_, err := redisClient.HIncrBy(ctx, "leaderboard", username, 1).Result()
	return err
}
func saveUser(user User) error {
	// Convert user data to JSON
	userJSON, err := json.Marshal(user)
	if err != nil {
		return err
	}

	// Set user data in Redis
	err = redisClient.HSet(ctx, user.Email, "users", userJSON).Err()
	if err != nil {
		return err
	}

	return nil
}

// Function to retrieve the leaderboard from Redis
func GetLeaderboard() (map[string]int64, error) {
	// Retrieve leaderboard from Redis
	leaderboard, err := redisClient.HGetAll(ctx, "leaderboard").Result()
	if err != nil {
		return nil, err
	}

	// Convert leaderboard to map[string]int64
	result := make(map[string]int64)
	for username, pointsStr := range leaderboard {
		points, _ := strconv.ParseInt(pointsStr, 10, 64)
		result[username] = points
	}
	return result, nil
}
