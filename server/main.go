package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	"github.com/tikokito123/main/routes"
)

func handleRequests() {
	router := mux.NewRouter()
	//subroutersc
	users := router.PathPrefix("/users").Subrouter()
	//middlewares
	//gets
	router.HandleFunc("/", homePage).Methods("GET")
	//users
	users.HandleFunc("/create", routes.CreateNewUser).Methods("POST")
	//users.HandleFunc("/{id}", routes.GetUser).Methods("GET")
	users.HandleFunc("/", routes.GetUsers).Methods("GET")
	//listen
	if err := http.ListenAndServe(":"+os.Getenv("PORT"), router); err != nil {
		logrus.Error("could not listen and serve: ", err.Error())
		return
	}

}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
}

func main() {
	//log
	logrus.SetFormatter(&logrus.TextFormatter{
		ForceColors:   true,
		DisableColors: false,
		FullTimestamp: true,
	})

	err := godotenv.Load(".env.dev")
	if err != nil {
		logrus.Warn("could not find env file")
	}

	logrus.Info("Rest API v2.0 - Mux Routers")
	logrus.Info("listen on localhost" + ":" + os.Getenv("PORT"))

	handleRequests()
}
