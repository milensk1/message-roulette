import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { verifySocket } from "./middleware/authentication.js";

dotenv.config();
const host = process.env.HOST;
const httpPort = process.env.HTTP_PORT;
const pubPort = process.env.PUB_PORT;

const app = express();
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

const server = createServer(app);
const io = new Server(server);
io.use((socket, next) => {
  verifySocket(socket, next);
});
app.io = io;

const pubClient = createClient({ host, port: pubPort });
const subClient = pubClient.duplicate();
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  server.listen(httpPort);
});
