# Message Roulette
```
Simple service which sends a message to random online users by a specific API.

OVERVIEW:

server communication based on socket.io connections
the server is scalable (messages from user A in server X can pass to user B in server Y) via Redis adapter
server API is accessible to authenticated users only
Basic user authentication using MySQL

APIs:
“register” - simple user registration flow
“login” - simple user login flow 

“spin” - send a message to a random user
“wild” -  send a message to X random users. X will be determined by the client.
“blast”  - sends a message to all users

```

## Prerequisites

```
installed and running MySQL server, Redis:
on Mac OS
brew install mysql
mysql.server start
brew install redis
redis-server

in MySQL create table "message_roulette"
```

## Install

```
npm install
```

## Run

```
npm start
```