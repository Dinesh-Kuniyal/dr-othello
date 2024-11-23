const LINE_BREAK = '\n';
const WHITE_COIN = '⚪';
const BLACK_COIN = '⚫';

let row_0 = '0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 0️⃣';
let row_1 = '1️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜1️⃣';
let row_2 = '2️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜2️⃣';
let row_3 = '3️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜3️⃣';
let row_4 = '4️⃣ ⬜⬜⬜⚪⚫⬜⬜⬜4️⃣';
let row_5 = '5️⃣ ⬜⬜⬜⚫⚪⬜⬜⬜5️⃣';
let row_6 = '6️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜6️⃣';
let row_7 = '7️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜7️⃣';
let row_8 = '8️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜8️⃣';

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
  console.log(row_0);
  console.log(row_1);
  console.log(row_2);
  console.log(row_3);
  console.log(row_4);
  console.log(row_5);
  console.log(row_6);
  console.log(row_7);
  console.log(row_8);
  console.log(row_0);
}

function removeBoundaries(string) {
  return slice(string, 4, 11);
}

function getBoard() {
  const filteredRow_1 = removeBoundaries(row_1);
  const filteredRow_2 = removeBoundaries(row_2);
  const filteredRow_3 = removeBoundaries(row_3);
  const filteredRow_4 = removeBoundaries(row_4);
  const filteredRow_5 = removeBoundaries(row_5);
  const filteredRow_6 = removeBoundaries(row_6);
  const filteredRow_7 = removeBoundaries(row_7);
  const filteredRow_8 = removeBoundaries(row_8);

  const startingRows = filteredRow_1 + filteredRow_2 + filteredRow_3;
  const middleRows = filteredRow_4 + filteredRow_5 + filteredRow_6;
  const endingRows = filteredRow_7 + filteredRow_8;

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

function repeat(string, times) {
  if (times === 0) {
    return "";
  }

  return string + repeat(string, times - 1);
}

function addTrailingString(text, string) {
  return string + text + string;
}

function showMessage(message) {
  const SPACES_COUNT = 2;
  const borderItemsCount = message.length + SPACES_COUNT + 20;
  
  const tralingBorder = repeat('=', 10);
  const border = repeat('=', borderItemsCount);

  const messageBorder = addTrailingString(border, LINE_BREAK);
  const messageWithSpace = addTrailingString(message, ' ');

  const messageSection = tralingBorder + messageWithSpace + tralingBorder;
  console.log(messageBorder + messageSection + messageBorder);
}

function showResult() {
  const whiteCoinsCount = countFinalCoins(WHITE_COIN);
  const blackCoinsCount = countFinalCoins(BLACK_COIN);

  showMessage('Black :- ' + blackCoinsCount);
  showMessage('White :- ' + whiteCoinsCount);

  if (whiteCoinsCount === blackCoinsCount) {
    showMessage('Its a draw..');
    return;
  }

  if (whiteCoinsCount > blackCoinsCount) {
    showMessage('White is Victorious : ' + player1Name);
    return;
  }

  showMessage('Black is Victorious : ' + player2Name);
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
  row_1 = '1️⃣ ' + slice(string, 0, 7) + '1️⃣';
  row_2 = '2️⃣ ' + slice(string, 8, 15) + '2️⃣';
  row_3 = '3️⃣ ' + slice(string, 16, 23) + '3️⃣';
  row_4 = '4️⃣ ' + slice(string, 24, 31) + '4️⃣';
  row_5 = '5️⃣ ' + slice(string, 32, 39) + '5️⃣';
  row_6 = '6️⃣ ' + slice(string, 40, 47) + '6️⃣';
  row_7 = '7️⃣ ' + slice(string, 48, 55) + '7️⃣';
  row_8 = '8️⃣ ' + slice(string, 56, 63) + '8️⃣';
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

  bulkUpdate(row, column, coinsCount, addToRow, addToCol, playerNumber);
}

function getCurrentCoin(row, column) {
  const indexToCheck = calculateIndex(row, column);
  const board = getBoard();

  return board[indexToCheck];
}

function isCellOutOfBound(row, column) {
  return column > 8 || row > 8 || column < 1 || row < 1;
}

function countCoins(row, column, player, addToRow, addToCol, coinsCount) {
  let newRow = row + addToRow;
  let newColumn = column + addToCol;

  if (isCellOutOfBound(newRow, newColumn)) {
    return 0;
  }

  const currentCoin = getCurrentCoin(newRow, newColumn);

  if (currentCoin === '⬜') {
    return 0;
  }

  if (currentCoin === getMark(player)) {
    return coinsCount;
  }

  let newCount = coinsCount + 1;

  return countCoins(newRow, newColumn, player, addToRow, addToCol, newCount);
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
  if (isCellOutOfBound(row, column)) {
    return false;
  }

  const board = getBoard();
  const indexToCheck = calculateIndex(row, column);

  return board[indexToCheck] === WHITE_COIN || board[indexToCheck] === BLACK_COIN;
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
  if (isCellOutOfBound(row, column)) {
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
  showMessage('Welcome to DR. Othello');

  player1Name = askName('Enter first player name : ', 'John');
  player2Name = askName('Enter second player name : ', 'Michel');

  startOthello(0);
}

initializeOthello();