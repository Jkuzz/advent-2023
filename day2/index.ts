type CubeCounts = {
  red: number
  blue: number
  green: number
}

const MAXIMUM_COUNTS: CubeCounts = {
  red: 12,
  blue: 13,
  green: 14
}

const parseCubeCounts = (move: string[]) => {
  const cubes: CubeCounts = { red: 0, blue: 0, green: 0 }
  move.forEach(selection => {
    Object.keys(cubes).forEach((color) => {
      if (selection.includes(color)) {
        cubes[color as keyof CubeCounts] = +selection.replace(/\D/g, '')
      }
    })
  })
  return cubes
}

const determinePossibility = (cubeCount: CubeCounts) => {
  const out = Object.entries(cubeCount).map(([colour, count]) =>
    count <= MAXIMUM_COUNTS[colour as keyof CubeCounts]
  )
  return out.every(Boolean)
}

const handleLine = (line: string) => {
  const moves = line.split(':')[1].split(';').map(move => move.split(','))
  const movesWerePossible = moves.map(parseCubeCounts).map(determinePossibility)
  console.log('🚀 ~ file: index.ts:39 ~ handleLine ~ movesWerePossible:', movesWerePossible);
  return movesWerePossible.every(Boolean)
}

const res = (await Bun.file('day2/test_input.txt').text())
  .trim()
  .split('\n')
  .splice(2, 1)
  .map(handleLine)
  .reduce((acc, curr) => acc && curr, true)


console.log(res)
