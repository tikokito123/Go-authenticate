package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
	"github.com/tikokito123/main/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var client *mongo.Client

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username,omitempty" bson:"username,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
}

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)
	if err != nil {
		logrus.Error("could not hash! 	", err.Error())
		return password, err
	}
	return string(hash), nil
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	params := mux.Vars(r)

	id, _ := primitive.ObjectIDFromHex(params["id"])
	var user User

	client, _ = database.GetMongoClient()

	collection := client.Database(database.DB).Collection(database.Collection_users)

	ctx, cancle := context.WithTimeout(context.Background(), 20*time.Second)

	defer cancle()

	err := collection.FindOne(ctx, User{ID: id}).Decode(&user)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(user)
}

func CreateNewUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	var user User

	json.NewDecoder(r.Body).Decode(&user)

	client, err := database.GetMongoClient()
	if err != nil {
		logrus.Error(err.Error())
		return
	}

	collection := client.Database(database.DB).Collection(database.Collection_users)
	logrus.Info(collection)
	ctx, cancle := context.WithTimeout(context.Background(), 20*time.Second)

	defer cancle()

	hash, err := HashPassword(user.Password)
	if err != nil {
		logrus.Error(err.Error())
		return
	}
	logrus.Info("hashed: " + user.Password + " to: " + hash)

	result, err := collection.InsertOne(ctx, user)
	if err != nil {
		logrus.Error(err.Error())
		return
	}

	tokenString, err := GenerateToken(user.Username)

	if err != nil {
		log.Print("error")
		logrus.Error("could not generate token", err.Error())
		return
	}
	fmt.Print(tokenString)
	json.NewEncoder(w).Encode(result)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	logrus.Debug("here cusemec")
	w.Header().Add("content-type", "application/json")
	var users []User

	client, _ = database.GetMongoClient()

	collection := client.Database(database.DB).Collection(database.Collection_users)

	ctx, cancle := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancle()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var user User
		cursor.Decode(&user)
		users = append(users, user)
	}
	if err := cursor.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}

	json.NewEncoder(w).Encode(users)
}

var jwt_key = []byte(os.Getenv("JWT_TOKEN"))

func GenerateToken(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = true
	claims["user"] = username
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()

	tokenString, err := token.SignedString(jwt_key)

	if err != nil {
		logrus.Error("something went wrong", err.Error())
		return "", err
	}
	return tokenString, nil
}
