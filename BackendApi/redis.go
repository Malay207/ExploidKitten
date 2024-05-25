package main

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var redisClient *redis.Client

func init() {
	// Initialize Redis client
	redisClient = redis.NewClient(&redis.Options{
		Addr:     "redis-16995.c261.us-east-1-4.ec2.redns.redis-cloud.com:16995",
		Password: "PHHFCclExab5q2fiXMGpfu0JzemMYeKb",
		DB:       0, // use default DB
	})

	// Test the connection
	pong, err := redisClient.Ping(ctx).Result()
	if err != nil {
		fmt.Println("Error connecting to Redis:", err)
		return
	}
	fmt.Println("Connected to Redis:", pong)
}
