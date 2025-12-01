import express from "express";
import http from "http";
import { Server } from "socket.io";
import { handleJoin, handleMove, handleDisconnect } from "./room.js";
import { tirarCarta, unirseMesa } from "./sala.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`🟢 Nuevo jugador conectado: ${socket.id}`);

  socket.on("joinGame", () => handleJoin(io, socket));

  socket.on("unirseMesa", () => unirseMesa(io, socket));

  socket.on("playerMove", (data) => handleMove(io, socket, data));

  socket.on("tirarCarta", (data) => tirarCarta(io, socket, data));


  socket.on("disconnect", () => handleDisconnect(io, socket));
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
