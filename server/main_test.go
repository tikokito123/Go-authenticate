package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func randomHex(n int) (string, error) {
	bytes := make([]byte, n)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

func TestInstertData(t *testing.T) {
	err := godotenv.Load(".env.dev")
	if err != nil {
		logrus.Warn(err, "ther file .env.dev was not found")
	}
	logrus.Info(os.Getenv("mongo_URL"))
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(os.Getenv("mongo_URL")))
	hex, _ := randomHex(10)
	id, _ := primitive.ObjectIDFromHex(hex)
	if err != nil {
		t.Error(err)
		logrus.Error(err, "Could not access the collection database")
	}
	collection := client.Database("Golang").Collection("testing")
	res, err := collection.InsertOne(context.Background(), User{id, "user_test", "123456"})

	assert.Nil(t, err)
	assert.IsType(t, &mongo.InsertOneResult{}, res)
}
