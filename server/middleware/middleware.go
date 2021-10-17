package middleware

import (
	"net/http"

	"github.com/sirupsen/logrus"
)

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//do stuff

		logrus.Info(r.RequestURI)

		next.ServeHTTP(w, r)
	})
}
