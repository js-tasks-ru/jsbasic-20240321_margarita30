function getMinMax(str) {
  let numbers = str
    .split(" ")
    .map(parseFloat)
    .filter((num) => num);

  let min = Math.min(...numbers);
  let max = Math.max(...numbers);

  return { min, max };
}
