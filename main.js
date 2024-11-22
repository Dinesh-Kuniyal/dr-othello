let string0 = '0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 0️⃣';
let string1 = '1️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜1️⃣';
let string2 = '2️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜2️⃣';
let string3 = '3️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜3️⃣';
let string4 = '4️⃣ ⬜⬜⬜⚪⚫⬜⬜⬜4️⃣';
let string5 = '5️⃣ ⬜⬜⬜⚫⚪⬜⬜⬜5️⃣';
let string6 = '6️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜6️⃣';
let string7 = '7️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜7️⃣';
let string8 = '8️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜8️⃣';

let player1Name = "";
let player2Name = "";

function getMark(playerNumber) {
  return playerNumber === 0 ? "⚪" : "⚫";
}

function getMessage(playerNumber) {
  const playerName = playerNumber === 0 ? player1Name : player2Name;
  const message = '\n\nPlayer ' + playerName + ' select row and column.';

  return message;
}

function slice(text, start, end) {
  if (start > end || text.length === 0) {
    return "";
  }

  return text[start] + slice(text, start + 1, end);
}

function printBoard() {
  console.log('\n');
  console.log(string0);
  console.log(string1);
  console.log(string2);
  console.log(string3);
  console.log(string4);
  console.log(string5);
  console.log(string6);
  console.log(string7);
  console.log(string8);
  console.log(string0);
}

function removeBoundaries(string) {
  return slice(string, 4, 11);
}

function getBoard() {
  const filteredString1 = removeBoundaries(string1);
  const filteredString2 = removeBoundaries(string2);
  const filteredString3 = removeBoundaries(string3);
  const filteredString4 = removeBoundaries(string4);
  const filteredString5 = removeBoundaries(string5);
  const filteredString6 = removeBoundaries(string6);
  const filteredString7 = removeBoundaries(string7);
  const filteredString8 = removeBoundaries(string8);

  const startingRows = filteredString1 + filteredString2 + filteredString3;
  const middleRows = filteredString4 + filteredString5 + filteredString6;
  const endingRows = filteredString7 + filteredString8;

  return startingRows + middleRows + endingRows;
}

function countFinalCoins(coin) {
  const board = getBoard();

  let count = 0;

  for (let index = 0; index < board.length; index++) {
    if (board[index] === coin) {
      count++;
    }
  }

  return count;
}

function showResultMessage(message) {
  console.log("================================");
  console.log("========== " + message + " =======");
  console.log("================================");
}

function showResult() {
  const whiteCoins = countFinalCoins("⚪");
  const blackCoins = countFinalCoins("⚫");

  showResultMessage('Black :- ' + blackCoins);
  showResultMessage('White :- ' + whiteCoins);

  if (whiteCoins === blackCoins) {
    showResultMessage('Its a draw..');
    return;
  }

  if (whiteCoins > blackCoins) {
    showResultMessage('White is Victorious : ' + player1Name);
    return;
  }

  showResultMessage('Black is Victorious : ' + player2Name);
}

function isAnySpaceEmptyInBoard() {
  const board = getBoard();

  for (let index = 0; index < board.length; index++) {
    if (board[index] === '⬜') {
      return true;
    }
  }

  showResult();
  return false;
}

function addFilterToBoard(string) {
  string1 = '1️⃣ ' + slice(string, 0, 7) + '1️⃣';
  string2 = '2️⃣ ' + slice(string, 8, 15) + '2️⃣';
  string3 = '3️⃣ ' + slice(string, 16, 23) + '3️⃣';
  string4 = '4️⃣ ' + slice(string, 24, 31) + '4️⃣';
  string5 = '5️⃣ ' + slice(string, 32, 39) + '5️⃣';
  string6 = '6️⃣ ' + slice(string, 40, 47) + '6️⃣';
  string7 = '7️⃣ ' + slice(string, 48, 55) + '7️⃣';
  string8 = '8️⃣ ' + slice(string, 56, 63) + '8️⃣';
}

function replaceAtIndex(string, targetIndex, index, replacement) {
  if (index > string.length - 1) {
    return "";
  }

  const charToAdd = index === targetIndex ? replacement : string[index];
  index = index + 1;

  return charToAdd + replaceAtIndex(string, targetIndex, index, replacement);
}

function calculateIndex(row, column) {
  return (row - 1) * 8 + column - 1;
}

function updateBoard(row, column, playerNumber) {
  const coinIndex = calculateIndex(row, column);
  const coinToAdd = getMark(playerNumber);

  const board = getBoard();
  const updatedBoard = replaceAtIndex(board, coinIndex, 0, coinToAdd);

  addFilterToBoard(updatedBoard);
}

function bulkUpdate(row, column, coinsCount, addToRow, addToCol, playerNumber) {
  if (coinsCount === 0) {
    return;
  }

  row = row + addToRow;
  column = column + addToCol;

  updateBoard(row, column, playerNumber);

  coinsCount = coinsCount - 1;

  return bulkUpdate(row, column, coinsCount, addToRow, addToCol, playerNumber);
}

function getCurrentCoin(row, column) {
  const indexToCheck = calculateIndex(row, column);
  const board = getBoard();

  return board[indexToCheck];
}

function countCoins(row, column, player, addToRow, addToCol, coinsCount) {
  row = row + addToRow;
  column = column + addToCol;

  if (column > 8 || row > 8 || column < 1 || row < 1) {
    return 0;
  }

  const currentCoin = getCurrentCoin(row, column);

  if (currentCoin === '⬜') {
    return 0;
  }

  if (currentCoin === getMark(player)) {
    return coinsCount;
  }

  coinsCount = coinsCount + 1;

  return countCoins(row, column, player, addToRow, addToCol, coinsCount);
}

function startProcessing(row, column, playerNumber) {
  updateBoard(row, column, playerNumber);

  const changeInRowF = countCoins(row, column, playerNumber, 0, 1, 0);
  bulkUpdate(row, column, changeInRowF, 0, 1, playerNumber);

  const changeInRowB = countCoins(row, column, playerNumber, 0, -1, 0);
  bulkUpdate(row, column, changeInRowB, 0, -1, playerNumber);

  const changeInColF = countCoins(row, column, playerNumber, 1, 0, 0);
  bulkUpdate(row, column, changeInColF, 1, 0, playerNumber);

  const changeInColB = countCoins(row, column, playerNumber, -1, 0, 0);
  bulkUpdate(row, column, changeInColB, -1, 0, playerNumber);

  const changeInNE = countCoins(row, column, playerNumber, -1, 1, 0);
  bulkUpdate(row, column, changeInNE, -1, 1, playerNumber);

  const changeInSE = countCoins(row, column, playerNumber, 1, 1, 0);
  bulkUpdate(row, column, changeInSE, 1, 1, playerNumber);

  const changeInNW = countCoins(row, column, playerNumber, -1, -1, 0);
  bulkUpdate(row, column, changeInNW, -1, -1, playerNumber);

  const changeInSW = countCoins(row, column, playerNumber, 1, -1, 0);
  bulkUpdate(row, column, changeInSW, 1, -1, playerNumber);
}

function getRow() {
  return +prompt("Give the number of row.");
}

function getColumn() {
  return +prompt("Giver the number of column.");
}

function isPositionEmpty(row, column) {
  const board = getBoard();
  const indexToCheck = calculateIndex(row, column);

  return board[indexToCheck] === '⬜';
}

function isCoinNear(row, column) {
  if (row > 8 || column > 8 || row <= 0 || column <= 0) {
    return false;
  }
  const board = getBoard();
  const indexToCheck = calculateIndex(row, column);

  return board[indexToCheck] === '⚪' || board[indexToCheck] === '⚫';
}

function isPositionValid(row, column) {
  const position1Valid = isCoinNear(row - 1, column - 1);
  const position2Valid = isCoinNear(row - 1, column);
  const position3Valid = isCoinNear(row - 1, column + 1);
  const position4Valid = isCoinNear(row, column - 1);
  const position5Valid = isCoinNear(row, column + 1);
  const position6Valid = isCoinNear(row + 1, column - 1);
  const position7Valid = isCoinNear(row + 1, column);
  const position8Valid = isCoinNear(row + 1, column + 1);

  const isValid = position1Valid || position2Valid || position3Valid ||
    position4Valid || position5Valid || position6Valid || position7Valid
    || position8Valid;

  return isValid;
}

function isRowColomnValid(row, column) {
  if (row > 8 || column > 8 || row < 1 || column < 1) {
    return false;
  }

  return isPositionEmpty(row, column) && isPositionValid(row, column);
}

function startOthello(playerNumber) {
  printBoard();

  if (!isAnySpaceEmptyInBoard()) {
    return 0;
  }

  playerNumber = playerNumber % 2;
  console.log(getMessage(playerNumber));

  const row = getRow();
  const column = getColumn();

  if (!isRowColomnValid(row, column)) {
    console.clear();
    return startOthello(playerNumber);
  }

  startProcessing(row, column, playerNumber);

  console.clear();
  return startOthello(playerNumber + 1);
}

function askName(message, defaultValue) {
  return prompt(message, defaultValue);
}

function initializeOthello() {
  showResultMessage('Welcome to DR. Othello');

  player1Name = askName('Enter first player name : ', 'John');
  player2Name = askName('Enter second player name : ', 'Michel');

  startOthello(0);
}

initializeOthello();
