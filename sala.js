import { realizarAcciones } from './Carta/gameLogic.js';
let waitingPlayer = null;

export function unirseMesa(io, socket) {
  if (waitingPlayer) {
    const roomName = `${waitingPlayer.id}-${socket.id}`;
    socket.join(roomName);
    waitingPlayer.join(roomName);
    socket.room = roomName;
    waitingPlayer.room = roomName;

    io.to(roomName).emit("startGame", {
      message: "Partida iniciada",
      room: roomName,
      jugadores: [
        { id: waitingPlayer.id},
        { id: socket.id},
      ],
      empieza:waitingPlayer.id
    });
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    socket.emit("waiting", "Esperando otro jugador...");
  }
}

export function tirarCarta(io, socket, data) {
  const room = socket.room;
  if (!room) return;
  const mensaje= realizarAcciones(data.yo, data.micarta, data.cartarival, data.poder, data.escudo)
  io.to(room).emit("cartas", mensaje);
}


