package middleware

import (
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v4"
	"github.com/sirupsen/logrus"
)

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("jwt")
		if err != nil {
			logrus.Error("there is no such token!")
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintln(w, "please sign up or sign in before you rich this page!")
			return
		}

		token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				logrus.Error("something went wrong on jwt auth middleware")
				return nil, fmt.Errorf("there was an error")
			}
			return os.Getenv("JWT_TOKEN"), nil
		})
		if err != nil {
			logrus.Error(err.Error())
			fmt.Fprintln(w, err.Error())
			return
		}

		logrus.Info(r.RequestURI)

		if !token.Valid {
			fmt.Fprintf(w, "Not Authorized")
		}

		next.ServeHTTP(w, r)
	})
}
