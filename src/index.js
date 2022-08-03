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
const port = process.env.PORT || 3000;

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
app.io = io;

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  httpServer.listen(port);
});

// set authorization for socket.io
io.use((socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log();
  }
});
