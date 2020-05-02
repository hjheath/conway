const tick = (aliveCells: Set<string>): Set<string> => {
  const nextAliveCells: Set<string> = new Set()
  const possibleCellSet = possibleCells(aliveCells)
  for (const cell of possibleCellSet) {
    const neighbours = aliveNeighbours(cell, aliveCells)
    if ((neighbours === 3) || (neighbours === 2 && aliveCells.has(cell))) {
      nextAliveCells.add(cell)
    }
  }
  return nextAliveCells
}

const possibleCells = (aliveCells: Set<string>): Set<string> => {
  const possibles: Set<string> = new Set()
  for (const coords of aliveCells) {
    const [x, y] = coordsToInts(coords)
    for (let i = x - 1; i <= x + 2; i++) {
      for (let j = y - 1; j <= y + 2; j++) {
        possibles.add(coordsToString(i, j))
      }
    }
  }
  return possibles
}

const aliveNeighbours = (coordinates: string, aliveCells: Set<string>): number => {
  let count = 0
  const [x, y] = coordsToInts(coordinates)
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) {
        continue;
      }
      if (aliveCells.has(coordsToString(i, j))) {
        count ++
      }
    }
  }
  return count
}

const coordsToInts = (coordinates: string): [number, number] => {
  const [x, y] = coordinates.split(',');
  return [parseInt(x), parseInt(y)];
}

const coordsToString = (x: number, y: number): string => {
  return `${x},${y}`
}

export default tick
