FROM golang:latest
WORKDIR /usr/app

COPY server/go.mod .
COPY server/go.sum .
RUN go mod download

COPY server/*.go .

RUN go build -o run-server .

EXPOSE 3000

CMD ["./run-server"]
