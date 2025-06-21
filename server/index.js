import { createServer } from "http";

import "dotenv/config";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import GameServer from "./GameServer";

const PORT = process.env.PORT || 4000;
const ORIGIN =
  process.env.ORIGIN || "http://localhost:4000,http://localhost:3000";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(
  cors({
    origin: ORIGIN.split(","),
  })
);
app.get("/health", (_, res) => res.send("OK"));

io.on("connection", function (socket) {
  new GameServer(socket);
});

server.listen(PORT);
