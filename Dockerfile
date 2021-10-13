FROM golang:latest
WORKDIR /usr/app

ENV PORT=3000
ENV HOST=0.0.0.0
ENV IS_DOCKER=true

COPY server/go.mod .
COPY server/go.sum .
RUN go mod download

COPY /server/*.go .

RUN go build -o run-server .

EXPOSE 3000

CMD ["./run-server"]
