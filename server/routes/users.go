package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
	models "github.com/tikokito123/main/Models"
	"github.com/tikokito123/main/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var client *mongo.Client

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
	var user models.User

	client, _ = database.GetMongoClient()

	collection := client.Database(database.DB).Collection(database.Collection_users)

	ctx, cancle := context.WithTimeout(context.Background(), 20*time.Second)

	defer cancle()

	err := collection.FindOne(ctx, models.User{ID: id}).Decode(&user)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(user)
}

func CreateNewUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var user models.User
	// layout := "01/02 03:04:05PM '06 -0700"
	r.ParseForm()

	// user.Email = r.FormValue("email")
	// user.Username = r.FormValue("username")
	// user.Password = r.FormValue("password")
	// birth, err := time.Parse(layout, r.FormValue("date"))
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	logrus.Error(err.Error())
	// 	return
	// }
	// user.Date = birth
	// logrus.Info(user.Date)

	//if you want to use postman, use this line of code

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		logrus.Error(err.Error())
		return
	}

	logrus.Info(user)

	client, err := database.GetMongoClient()
	if err != nil {
		logrus.Error(err.Error())
		return
	}

	collection := client.Database(database.DB).Collection(database.Collection_users)

	ctx, cancle := context.WithTimeout(context.Background(), 20*time.Second)

	defer cancle()

	hash, err := HashPassword(user.Password)
	if err != nil {
		logrus.Error(err.Error())
		return
	}
	user.Password = hash

	result, err := collection.InsertOne(ctx, user)
	if err != nil {
		logrus.Error(err.Error())
		return
	}
	logrus.Info(result)

	token, err := GenerateToken(user.Username)
	if err != nil {
		log.Print("error")
		logrus.Error("could not generate token", err.Error())
		return
	}
	cookie := http.Cookie{
		Name:   "jwt",
		Value:  token,
		MaxAge: 0,
	}
	http.SetCookie(w, &cookie)

	http.Redirect(w, r, "/users/", http.StatusMovedPermanently)
}

func SignInUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var user models.User

	r.ParseForm()

	username := r.FormValue("username")
	password := r.FormValue("password")

	client, _ = database.GetMongoClient()

	collection := client.Database(database.DB).Collection(database.Collection_users)

	if err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user); err != nil {
		logrus.Error(err.Error())
		fmt.Fprintln(w, "username or passwod are not mutch!")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		logrus.Error("username or password are not mutch")
		fmt.Fprintln(w, "username or passwod are not mutch!")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	token, _ := GenerateToken(user.Username)

	cookie := http.Cookie{Name: "jwt", Value: token, MaxAge: 0, Path: "/"}
	http.SetCookie(w, &cookie)

	http.Redirect(w, r, "/auth/", http.StatusMovedPermanently)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	var users []models.User

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
		var user models.User
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
	logrus.Info(tokenString)
	if err != nil {
		logrus.Error("something went wrong", err.Error())
		return "", err
	}

	return tokenString, nil
}
