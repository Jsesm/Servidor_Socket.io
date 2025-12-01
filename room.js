import { realizarAcciones, CogerAlAzar } from './Raya/gameLogic.js';
let waitingPlayer = null;

export function handleJoin(io, socket) {
  if (waitingPlayer) {
    const roomName = `${waitingPlayer.id}-${socket.id}`;
    socket.join(roomName);
    waitingPlayer.join(roomName);
    socket.room = roomName;
    waitingPlayer.room = roomName;

    // 🚀 Console.log añadido para confirmar la creación de la sala
    console.log(`✅ Sala creada: ${roomName} con jugadores ${waitingPlayer.id} y ${socket.id}`);

    io.to(roomName).emit("startGame", {
      message: "Partida iniciada",
      room: roomName,
      jugadores: [
        { id: waitingPlayer.id},
        { id: socket.id},
      ],
      empieza:waitingPlayer.id,
      jugador1: CogerAlAzar(),
      jugador2: CogerAlAzar()
    });
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    socket.emit("waiting", "Esperando otro jugador...");
  }
}

export function handleMove(io, socket, data) {
  const room = socket.room;
  if (!room) return;
  const [tablero, jug1, jug2]= realizarAcciones(data.tablero, data.index, data.ficha, data.jugador, data.numero)
  const moveData = {
    tablero: tablero,
    jugador1: jug1,
    jugador2: jug2,
  };

  io.to(room).emit("updateBoard", moveData);
}

export function handleDisconnect(io, socket) {
  console.log(`🔴 Jugador desconectado: ${socket.id}`);
  if (waitingPlayer && waitingPlayer.id === socket.id) {
    waitingPlayer = null;
  }
  if (socket.room) {
    io.to(socket.room).emit("opponentLeft", "Tu oponente se ha desconectado.");
  }
}