let fileInput = process.env.FILE_INPUT ? process.env.FILE_INPUT : "/dev/stdin";
let input = require("fs").readFileSync(fileInput, "utf8");
let arrayOfLines = input.split("\n");

const debug = (...args) => process.env.DEBUG && console.log(...args);
function keepNotEmptyLine(line) {
  return line;
}

let linesNotEmpty = arrayOfLines
  .filter(keepNotEmptyLine)
  .map((string) => +string);

function fn() {
  function game(startIndex, lines) {
    debug(`startIndex`, startIndex);

    const coinsQuantity = lines[startIndex];
    debug(`coinsQuantity`, coinsQuantity);

    let currentCoinIndex = coinsQuantity + startIndex;
    const jump = lines[currentCoinIndex + 1];
    let sum = 0;
    while (currentCoinIndex > startIndex) {
      debug(`currentCoinIndex`, currentCoinIndex);
      debug(`currentCoinValue`, lines[currentCoinIndex]);

      sum = sum + lines[currentCoinIndex];
      currentCoinIndex -= jump;
      debug(`sum`, sum);
    }
    if (sum === 1 || sum === 0) {
      debug(`nao primo pq a soma ${sum} é 1 ou 0`);

      return false;
    }

    for (let i = 2; i < sum; i++) {
      if (sum % i === 0) {
        debug(`nao primo pq ${i} é divisor de ${sum}`);
        return false;
      }
    }
    debug(`primo pq ${sum} é primo`);
    return true;
  }

  const isPrimo = game(0, linesNotEmpty);

  if (isPrimo) {
    console.log(`You’re a coastal aircraft, Robbie, a large silver aircraft.`);
    return;
  }

  console.log(`Bad boy! I’ll hit you.`);

  const isPrimoSecondTry = game(+linesNotEmpty[0] + 2, linesNotEmpty);

  if (!isPrimoSecondTry) {
    return;
  }

  console.log(`You’re a coastal aircraft, Robbie, a large silver aircraft.`);
}

fn();
