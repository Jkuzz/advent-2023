type CubeCounts = {
  red: number
  blue: number
  green: number
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

const handleLine = (line: string) => {
  const moves = line.split(':')[1].split(';').map(move => move.split(','))
  const minimums = {
    red: 0,
    blue: 0,
    green: 0,
  };
  moves.forEach((move) => {
    const cubeCounts = parseCubeCounts(move)
    Object.keys(cubeCounts).forEach((color) => {
      const cubeColour = color as keyof CubeCounts
      minimums[cubeColour] = Math.max(cubeCounts[cubeColour], minimums[cubeColour])
    })
  });
  return minimums.red * minimums.blue * minimums.green;
}

const res = (await Bun.file('day2/input.txt').text())
  .trim()
  .split('\n')
  .map(handleLine)
  .reduce((acc, power) => acc + power, 0)

console.log(res)
