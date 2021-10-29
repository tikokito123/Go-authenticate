FROM node:alpine as Client
WORKDIR /usr/app

COPY ./client/package.json .
RUN npm install
COPY ./client .
RUN  npm run build




FROM golang:alpine
WORKDIR /usr/app

ENV PORT=80
ENV HOST=0.0.0.0

COPY server/go.mod .
COPY server/go.sum .
RUN go mod download

COPY server ./

RUN go build -o run-server .

COPY --from=Client ./build /usr/app/build

EXPOSE 80

CMD ["./run-server"]
