import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import jwt from "jsonwebtoken";

dotenv.config();
const host = process.env.HOST;
const httpPort = process.env.HTTP_PORT;
const pubPort = process.env.PUB_PORT;
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const app = express();
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

const server = createServer(app);
const io = new Server(server);
const pubClient = createClient({ host: host, port: pubPort });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  server.listen(httpPort);
});

app.io = io;

// set authorization for socket.io
io.use((socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, tokenSecret);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log();
  }
});
