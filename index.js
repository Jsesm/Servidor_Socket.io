import express from "express";
import http from "http";
import { Server } from "socket.io";
import { handleJoin, handleMove, handleDisconnect } from "./room.js";
import { tirarCarta, unirseMesa } from "./sala.js";
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(cors()); // Habilita CORS para todas las rutas

const io = new Server(server, {
  cors: {
    origin: "*", // Puedes poner la URL de tu frontend en lugar de "*"
    methods: ["GET", "POST"]
  }
});

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
