package main

import (
	"net/http"
	"os"
	"path"
	"text/template"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	"github.com/tikokito123/main/routes"
)

func handleRequests() {
	router := mux.NewRouter()
	//subroutersc
	users := router.PathPrefix("/users").Subrouter()
	auth := router.PathPrefix("/auth").Subrouter()
	//middlewares
	auth.Use(middleware.Authenticate)

	router.HandleFunc("/", homePage).Methods("GET")
<<<<<<< HEAD
=======
	auth.HandleFunc("/", authPage).Methods("GET")

>>>>>>> 6bf55322396bc1f2bcb4dfb3c659fd83ce6d983b
	//users
	users.HandleFunc("/create", routes.CreateNewUser).Methods("POST")
	users.HandleFunc("/sign-in", routes.SignInUser).Methods("POST")

	//users.HandleFunc("/{id}", routes.GetUser).Methods("GET")
	users.HandleFunc("/", routes.GetUsers).Methods("GET")
	users.HandleFunc("/sign-in", signInPage).Methods("GET")
	//listen
	if err := http.ListenAndServe(os.Getenv("HOST")+":"+os.Getenv("PORT"), router); err != nil {
		logrus.Error("could not listen and serve: ", err.Error())
		return
	}

}

func authPage(w http.ResponseWriter, r *http.Request) {
	fp := path.Join("templates", "jwtPage.html")

	tmpl, err := template.ParseFiles(fp)
	if err != nil {
		logrus.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tmpl.Execute(w, "Here I am"); err != nil {
		logrus.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
} //todo delete

func homePage(w http.ResponseWriter, r *http.Request) {
	fp := path.Join("templates", "index.html")

	tmpl, err := template.ParseFiles(fp)
	if err != nil {
		logrus.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tmpl.Execute(w, "Here I am"); err != nil {
		logrus.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func signInPage(w http.ResponseWriter, r *http.Request) {
	fp := path.Join("templates", "SignInPage.html")

	tmpl, err := template.ParseFiles(fp)
	if err != nil {
		logrus.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tmpl.Execute(w, "Here I am"); err != nil {
		logrus.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
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
	logrus.Info("listen on " + os.Getenv("HOST") + ":" + os.Getenv("PORT"))

	handleRequests()
}
