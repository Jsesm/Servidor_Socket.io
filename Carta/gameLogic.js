export function realizarAcciones(jugador, cartaJugador, cartaRival, poder, escudo) {
  let mensaje; 
  let cambio = "No";   // ← USAR let

  const esTurnoCompleto = cartaRival.numero !== "";

  if (String(cartaJugador.numero).trim() === "10") {
    cambio = poder;
  }
  
  if (esTurnoCompleto) {

    const [puntosJug1, puntosJug2, turno] = calcularPuntos(jugador, cartaJugador, cartaRival, poder, escudo, cartaRival.palo);

    if (jugador === "jugador1") {
      mensaje = {
        jugador1: cartaJugador,
        jugador2: cartaRival,
        puntos1: puntosJug1,
        puntos2: puntosJug2,
        siguienteronda: true,
        cambio: cambio,
        turno: turno
      };
    } else {
      mensaje = {
        jugador1: cartaRival,
        jugador2: cartaJugador,
        puntos1: puntosJug1,
        puntos2: puntosJug2,
        siguienteronda: true,
        cambio: cambio,
        turno: turno
      };
    }
  } else {
    // No hay carta rival → no se suman puntos
    mensaje = {
      jugador1: jugador === "jugador1" ? cartaJugador : cartaRival,
      jugador2: jugador === "jugador1" ? cartaRival : cartaJugador,
      puntos1: 0,
      puntos2: 0,
      siguienteronda: false,
      cambio: cambio,
      turno: "No"
    };
  }

  return mensaje; 
}

function calcularPuntos(jugador, cartaJugador, cartaRival, poder, escudo, jugamos_con) {
  let jug1 = 0;   // ← DEBEN SER let
  let jug2 = 0;
  let cambio = "No";
  let turno ="No"

  if (jugador === "jugador1") {

    if (cartaJugador.numero === "10") {
      cambio = poder;
      [jug1, jug2, turno] = revisar(cartaJugador, cartaRival, poder, jugamos_con);
    } else {
      [jug1, jug2, turno] = revisar(cartaJugador, cartaRival, jugamos_con);
    }

  } else {

    if (cartaJugador.numero === "10") {
      cambio = poder;
      [jug2, jug1, turno] = revisar(cartaJugador, cartaRival, poder, jugamos_con);
    } else {
      [jug2, jug1, turno] = revisar(cartaJugador, cartaRival, escudo, jugamos_con);
    }

  }

  return [jug1, jug2, turno];
}

function revisar(cartaJugador, cartaRival, escudo, jugamos_con) {
  let jug1 = 0;   // ← CAMBIADOS A let
  let jug2 = 0;
  let turno="No"
  let miJugador=String(cartaJugador.numero).trim();
  let tuJugador=String(cartaRival.numero).trim();

  if (cartaJugador.palo === escudo && cartaRival.palo !== escudo) {

    jug1 = verPuntos(cartaJugador.numero, cartaRival.numero);
    turno="jugador1"

  } else if (cartaRival.palo === escudo && cartaJugador.palo !== escudo) {

    jug2 = verPuntos(cartaJugador.numero, cartaRival.numero);
    turno="jugador2"

  } else if (cartaRival.palo === jugamos_con && cartaJugador.palo !== jugamos_con) {

    jug2 = verPuntos(cartaJugador.numero, cartaRival.numero);
    turno="jugador2"

  } else if (cartaRival.palo !== jugamos_con && cartaJugador.palo === jugamos_con) {

    jug1 = verPuntos(cartaJugador.numero, cartaRival.numero);
    turno="jugador1"

  } else if (
    parseInt(cartaJugador.numero) > parseInt(cartaRival.numero) ||
    (miJugador === "1" && tuJugador !== "1")
  ) {

    jug1 = verPuntos(cartaJugador.numero, cartaRival.numero);
    turno="jugador1"

  } else if (
    parseInt(miJugador) < parseInt(tuJugador) ||
    (miJugador !== "1" && tuJugador === "1")
  ) {

    jug2 = verPuntos(cartaJugador.numero, cartaRival.numero);
    turno="jugador2"

  } else {

    return [0, 0, turno];
  }

  return [jug1, jug2, turno];
}

function verPuntos(num1, num2) {
  const puntos1 = puntosCarta(num1);
  const puntos2 = puntosCarta(num2);

  return puntos1 + puntos2;
}

function puntosCarta(cart) {

  const carta = String(cart).trim();
  if (carta === "1") return 15;
  if (carta === "12") return 12;
  if (carta === "11") return 11;
  if (carta === "10") return 10;
  return 1;
}
