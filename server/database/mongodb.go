package database

import (
	"context"
	"os"
	"sync"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/* Used to create a singleton object of MongoDB client.
Initialized and exposed through  GetMongoClient().*/
var clientInstance *mongo.Client

var clientInstanceError error

//Used to execute client creation procedure only once.
var mongoOnce sync.Once

//I have used below constants just to hold required database config's.

const (
	DB               = "Twogether"
	Collection_tests = "testing"
	Collection_users = "users"
)

//GetMongoClient - Return mongodb connection to work with
func GetMongoClient() (*mongo.Client, error) {
	godotenv.Load(".dev.env")
	//Perform connection creation operation only once.
	mongoOnce.Do(func() {
		// Set client options
		clientOptions := options.Client().ApplyURI(os.Getenv("mongo_URL"))
		// Connect to MongoDB
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			clientInstanceError = err
		}
		// Check the connection
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			clientInstanceError = err
		}
		clientInstance = client
	})
	return clientInstance, clientInstanceError
}
