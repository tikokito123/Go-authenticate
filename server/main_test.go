package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	models "github.com/tikokito123/main/Models"
	"github.com/tikokito123/main/database"
	"github.com/tikokito123/main/routes"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func randomHex(n int) (string, error) {
	bytes := make([]byte, n)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}

	return hex.EncodeToString(bytes), nil
}

func TestInstertData(t *testing.T) {
	//vars
	var password string = "SomeUserPasswordToHash"

	//try to load env
	err := godotenv.Load(".env.dev")
	if err != nil {
		logrus.Warn(err, "the file .env.dev was not found")
	}

	//hex to create Id for mongo
	hex, _ := randomHex(10)
	id, _ := primitive.ObjectIDFromHex(hex)

	//hashing the password
	hash, _ := routes.HashPassword(password)

	//connect to the Database
	client, err := database.GetMongoClient()
	if err != nil {
		logrus.Error(err.Error())
	}

	collection := client.Database(database.DB).Collection(database.Collection_tests)

	res, err := collection.InsertOne(context.Background(), models.User{id, "testemail@gmail.com", time.Now(), "user_test", hash, false})

	if err != nil {
		logrus.Error(err.Error())
	}

	//assert result
	assert.Nil(t, err)
	assert.IsType(t, &mongo.InsertOneResult{}, res)
}

func TestHttpRequest(t *testing.T) {
	handler := func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "{ \"status\": \"Ok\" }")
	}

	req := httptest.NewRequest("GET", "http://localhost:3000/test/life", nil)
	w := httptest.NewRecorder()
	handler(w, req)

	resp := w.Result()
	body, _ := ioutil.ReadAll(resp.Body)

	fmt.Println(string(body))

	if 200 != resp.StatusCode {
		t.Fatal("status code not OK")
	}
}
