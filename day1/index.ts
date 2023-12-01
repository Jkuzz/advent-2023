const replaceNumbers = (line: string) => {
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].forEach((num, i) => {
    line = line.replaceAll(num, `${num}${i + 1}${num}`)
  })
  return line
}

console.log(
  (await Bun.file('day1/input.txt').text())
    .trim()
    .split('\n')
    .map(replaceNumbers)
    .map(line => line.split('').filter(num => !isNaN(+num)))
    .map(line => line[0] + line.at(-1))
    .reduce((acc, cur) => acc + +(cur), 0)
)
