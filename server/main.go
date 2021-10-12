package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username,omitempty" bson:"username,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

type Aritcle struct {
	Id      string `json:"Id"`
	Title   string `json:"Title"`
	Desc    string `json:"Desc"`
	Content string `json:"Content"`
}

var client *mongo.Client
var Articles []Aritcle

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	//posts
	router.HandleFunc("/article", createNewArticle).Methods("POST")
	router.HandleFunc("/users/create", createNewUser).Methods("POST")
	//gets
	router.HandleFunc("/", homePage)
	router.HandleFunc("/articles", returnAllArticles)
	router.HandleFunc("/articles/{id}", returnOneArticle)
	router.HandleFunc("/users", getUsers)
	router.HandleFunc("/users/{id}", getUser)

	//listen
	http.ListenAndServe(os.Getenv("HOST")+":"+os.Getenv("PORT"), router)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
}

func returnOneArticle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	fmt.Fprint(w, "key: "+key)

	for _, article := range Articles {
		if article.Id == key {
			json.NewEncoder(w).Encode(article)
		}
	}
}

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var user User
	collection := client.Database("Golang").Collection("users")
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

func returnAllArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Endpoint hit: returned Articles")
	json.NewEncoder(w).Encode(Articles)
}

func createNewArticle(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	fmt.Fprintf(w, "%+v", string(reqBody))
}

func createNewUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	var user User

	json.NewDecoder(r.Body).Decode(&user)
	fmt.Print(user)
	collection := client.Database("Golang").Collection("users")
	ctx, cancle := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancle()
	result, _ := collection.InsertOne(ctx, user)

	json.NewEncoder(w).Encode(result)
}
func getUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	var users []User

	collection := client.Database("Golang").Collection("users")

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

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err, " could not load env")
	}

	//connect to mongo
	ctx, cancle := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancle()
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("mongo_URL"))) //todo env

	fmt.Println("Rest API v2.0 - Mux Routers")

	fmt.Println("listen on " + os.Getenv("HOST") + ":" + os.Getenv("PORT"))

	handleRequests()

}
