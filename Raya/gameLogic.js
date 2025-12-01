
import { lines2, lines3, lines4, lines5 } from './posicionesGanadoras.js';
import { getEmoji } from './diccionarioEmojis.js';


const PALABRAS = ["gandalf", "legolas", "anillo", "smaug", "lurtz", "monte"];

export function CogerAlAzar() {
  const baraja = [...PALABRAS];
  return baraja
    .sort(() => Math.random() - 0.5) 
    .slice(0, 3);                   
}


export function CalcularPuntos(squares) {

  // 1️⃣ Crear sets para las casillas de cada jugador
  const casillasJugador1 = new Set();
  const casillasJugador2 = new Set();

  for (let i = 0; i < squares.length; i++) {
    const numero = squares[i]?.numero;

    if (numero === "jugador1") {
      casillasJugador1.add(i);
    } else if (numero === "jugador2") {
      casillasJugador2.add(i);
    }
  }

  // 2️⃣ Inicializar puntos
  let puntosJugador1 = 0;
  let puntosJugador2 = 0;

  // 3️⃣ Función auxiliar
  const lineaCompleta = (linea, setCasillas) =>
    linea.every(idx => setCasillas.has(idx));

  const recorrerLineas = (lines, puntos) => {
    for (const line of lines) {
      if (lineaCompleta(line, casillasJugador1)) puntosJugador1 += puntos;
      if (lineaCompleta(line, casillasJugador2)) puntosJugador2 += puntos;
    }
  };

  // 4️⃣ Calcular los puntos según las líneas
  recorrerLineas(lines5, 25);
  recorrerLineas(lines4, 10);
  recorrerLineas(lines3, 3);
  recorrerLineas(lines2, 1);

  // 5️⃣ Devolver el resultado
  return {
    jugador1: puntosJugador1,
    jugador2: puntosJugador2,
  };
}

export function realizarAcciones(tablero, index, ficha, juegoYo, numero) {

    let newSquares = [...tablero];

    newSquares[index] = {
    jugador: juegoYo,        
    value: ficha,
    numero:numero    
        }

    if(ficha===getEmoji("Smaug")){

      if(numero==="jugador1"){

        const puntos= CalcularPuntos(newSquares)
        return [newSquares, puntos.jugador1*2, puntos.jugador2]; 
      
      }else{

        const puntos= CalcularPuntos(newSquares)
        return [newSquares, puntos.jugador1, puntos.jugador2*2];
      
      }

    }else{

      newSquares= usarPoder(newSquares, ficha, index)
      const puntos= CalcularPuntos(newSquares)
      return [newSquares, puntos.jugador1, puntos.jugador2];
    
    }
    

}


function usarPoder(tablero, ficha, casilla){
  if(ficha===getEmoji("gandalf")){
      tablero=borrarVecino(tablero, casilla)
  }

  if(ficha===getEmoji("lurtz")){
      tablero=borrarCasilla(tablero)
  }

  if(ficha===getEmoji("anillo")){
        tablero[casilla] = {
    jugador: null,        
    value: null,
    numero:null    
        }
  }


  return tablero


}

function borrarCasilla(tablero) {

  // obtener índices válidos (cualquier casilla existente)
  const indices = tablero
    .map((c, i) => i);

  const aleatorio = indices[Math.floor(Math.random() * indices.length)];

  tablero[aleatorio] = {
    jugador: 1,
    value: null,
    numero: null
  };

  return tablero;
}


function borrarVecino(tablero, index) {

  const fila = Math.floor(index / 5);
  const col = index % 5;

  const posibles = [];

  const vecinos = [
    [fila - 1, col], // arriba
    [fila + 1, col], // abajo
    [fila, col - 1], // izquierda
    [fila, col + 1], // derecha
  ];

  for (const [f, c] of vecinos) {
    if (f >= 0 && f < 5 && c >= 0 && c < 5) {
      posibles.push(f * 5 + c);
    }
  }

  if (posibles.length === 0) return tablero;

  const elegido = posibles[Math.floor(Math.random() * posibles.length)];

  tablero[elegido] = {
    jugador: 1,
    value: null,
    numero: null
  };

  return tablero;
}