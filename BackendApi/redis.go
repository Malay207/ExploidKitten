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
		Addr:     "redis-13575.c301.ap-south-1-1.ec2.cloud.redislabs.com:13575",
		Password: "nbJMe8VgFWkC7ElhEyC0LVCN02JNVfJ2",
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
