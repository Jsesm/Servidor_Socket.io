export const lines2 = [
  // Horizontales (6)
  [6, 7], [7, 8],
  [11, 12], [12, 13],
  [16, 17], [17, 18],

  // Verticales (6)
  [6, 11], [11, 16],
  [7, 12], [12, 17],
  [8, 13], [13, 18],
];

export const lines3 = [
  // Horizontales (15) - Completo
  [0, 1, 2], [1, 2, 3], [2, 3, 4], [5, 6, 7], [6, 7, 8], [7, 8, 9],
  [10, 11, 12], [11, 12, 13], [12, 13, 14], [15, 16, 17], [16, 17, 18], [17, 18, 19],
  [20, 21, 22], [21, 22, 23], [22, 23, 24],

  // Verticales (15) - Completo
  [0, 5, 10], [5, 10, 15], [10, 15, 20], [1, 6, 11], [6, 11, 16], [11, 16, 21],
  [2, 7, 12], [7, 12, 17], [12, 17, 22], [3, 8, 13], [8, 13, 18], [13, 18, 23],
  [4, 9, 14], [9, 14, 19], [14, 19, 24],

  // Diagonales Descendentes (\) (16 en total, 8 de 3)
  [0, 6, 12], [6, 12, 18], [12, 18, 24], // Diagonal principal
  [1, 7, 13], [7, 13, 19], [5, 11, 17], [11, 17, 23], // Diagonales adyacentes a la principal
  [2, 8, 14], [10, 16, 22], // Diagonales exteriores (añadidas por completitud)

  // Diagonales Ascendentes (/) (16 en total, 8 de 3)
  [4, 8, 12], [8, 12, 16], [12, 16, 20], // Diagonal anti-principal
  [3, 7, 11], [7, 11, 15], [9, 13, 17], [13, 17, 21], // Diagonales adyacentes a la anti-principal
  [2, 6, 10], [14, 18, 22], // Diagonales exteriores (añadidas por completitud)
];

export const lines4 = [
  // Horizontales (10)
  [0, 1, 2, 3], [1, 2, 3, 4],
  [5, 6, 7, 8], [6, 7, 8, 9],
  [10, 11, 12, 13], [11, 12, 13, 14],
  [15, 16, 17, 18], [16, 17, 18, 19],
  [20, 21, 22, 23], [21, 22, 23, 24],

  // Verticales (10)
  [0, 5, 10, 15], [5, 10, 15, 20],
  [1, 6, 11, 16], [6, 11, 16, 21],
  [2, 7, 12, 17], [7, 12, 17, 22],
  [3, 8, 13, 18], [8, 13, 18, 23],
  [4, 9, 14, 19], [9, 14, 19, 24],

  // Diagonales Descendentes (\) (6)
  [0, 6, 12, 18], [6, 12, 18, 24], // Principal
  [1, 7, 13, 19], [5, 11, 17, 23], // Adyacentes
  [2, 8, 14], // [10, 16, 22] son 3
  
  // Diagonales Ascendentes (/) (6)
  [4, 8, 12, 16], [8, 12, 16, 20], // Anti-Principal
  [3, 7, 11, 15], [9, 13, 17, 21], // Adyacentes
];

export const lines5 = [
  // Horizontales (5)
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],

  // Verticales (5)
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],

  // Diagonales (2)
  [0, 6, 12, 18, 24], // Diagonal principal (\)
  [4, 8, 12, 16, 20], // Diagonal anti-principal (/)
];