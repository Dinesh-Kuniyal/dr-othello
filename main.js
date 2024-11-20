let string0 = '0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 0️⃣';
let string1 = '1️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜1️⃣';
let string2 = '2️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜2️⃣';
let string3 = '3️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜3️⃣';
let string4 = '4️⃣ ⬜⬜⬜⚪⚫⬜⬜⬜4️⃣';
let string5 = '5️⃣ ⬜⬜⬜⚫⚪⬜⬜⬜5️⃣';
let string6 = '6️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜6️⃣';
let string7 = '7️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜7️⃣';
let string8 = '8️⃣ ⬜⬜⬜⬜⬜⬜⬜⬜8️⃣';

function getMark(playerNumber) {
  return playerNumber === 0 ? "⚪" : "⚫";
}

function getMessage(playerNumber) {
  const segment2 = "\n\nPlayer 1 select row and column.";
  const segment3 = "\n\nPlayer 2 select row and column.";

  return playerNumber === 0 ? segment2 : segment3;
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

function removeFilterFromBoard() {
  const filteredString1 = removeBoundaries(string1);
  const filteredString2 = removeBoundaries(string2);
  const filteredString3 = removeBoundaries(string3);
  const filteredString4 = removeBoundaries(string4);
  const filteredString5 = removeBoundaries(string5);
  const filteredString6 = removeBoundaries(string6);
  const filteredString7 = removeBoundaries(string7);
  const filteredString8 = removeBoundaries(string8);

  return filteredString1 + filteredString2 + filteredString3 + filteredString4 +
    filteredString5 + filteredString6 + filteredString7 + filteredString8;
}

function isAnySpaceEmptyInBoard() {
  const board = removeFilterFromBoard();

  for (let index = 0; index < board.length; index++) {
    if (board[index] === '⬜') {
      return true;
    }
  }

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

function replaceAtIndex(string, indexToChange, index, replacement) {
  if (index > string.length - 1) {
    return "";
  }

  const charToAdd = index === indexToChange ? replacement : string[index];

  return charToAdd + replaceAtIndex(string, indexToChange, index + 1, replacement);
}

function calculateIndex(row, column) {
  return (row - 1) * 8 + column - 1;
}

function updateBoard(row, column, playerNumber) {
  const coinPosition = calculateIndex(row, column);
  const coinToAdd = getMark(playerNumber);

  const boardString = removeFilterFromBoard();
  const updateBoard = replaceAtIndex(boardString, coinPosition, 0, coinToAdd);

  addFilterToBoard(updateBoard);
}

function bulkUpdate(row, column, noOfCoinsToChange, rowOperation, colOperation, playerNumber) {
  if (noOfCoinsToChange === 0) {
    return;
  }

  row = row + rowOperation;
  column = column + colOperation;

  updateBoard(row, column, playerNumber);
  return bulkUpdate(row, column, noOfCoinsToChange - 1, rowOperation, colOperation, playerNumber);
}

function checkRow(row, column, playerNumber, noOfCoinsToChange, inForward, inRow) {

  const xPos = inRow ? inForward ? column + 1 : column - 1 : column;
  const yPos = !inRow ? inForward ? row + 1 : row - 1 : row;

  if (xPos > 8 || yPos > 8 || xPos < 1 || yPos < 1) {
    return 0;
  }

  const indexToCheck = calculateIndex(yPos, xPos);
  const boardString = removeFilterFromBoard();
  const currentCoin = boardString[indexToCheck];

  if (currentCoin === '⬜') {
    return 0;
  }

  if (currentCoin === getMark(playerNumber)) {
    return noOfCoinsToChange;
  }

  return checkRow(yPos, xPos, playerNumber, noOfCoinsToChange + 1, inForward, inRow);
}

function startProcessing(row, column, playerNumber) {
  updateBoard(row, column, playerNumber);
  console.log('Player Number', playerNumber);

  const coinsToChangeInRowF = checkRow(row, column, playerNumber, 0, true, true);
  bulkUpdate(row, column, coinsToChangeInRowF, 0, 1, playerNumber);
  const coinsToChangeInRowB = checkRow(row, column, playerNumber, 0, false, true);
  bulkUpdate(row, column, coinsToChangeInRowB, 0, -1, playerNumber);

  const coinsToChangeInColF = checkRow(row, column, playerNumber, 0, true, false);
  bulkUpdate(row, column, coinsToChangeInColF, 1, 0, playerNumber);
  const coinsToChangeInColB = checkRow(row, column, playerNumber, 0, false, false);
  bulkUpdate(row, column, coinsToChangeInColB, -1, 0, playerNumber);

  console.log('In forward row ', coinsToChangeInRowF);
  console.log('In backward row ', coinsToChangeInRowB);

  console.log('In forward col ', coinsToChangeInColF);
  console.log('In backward col ', coinsToChangeInColB);
}

function getRow() {
  return +prompt("Give the number of row.");
}

function getColumn() {
  return +prompt("Giver the number of column.");
}

function isPositionEmpty(row, column) {
  const board = removeFilterFromBoard();
  const indexToCheck = calculateIndex(row, column);
  console.log("index", indexToCheck);

  return board[indexToCheck] === '⬜';
}

function isCoinNear(row, column) {
  const board = removeFilterFromBoard();
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
  if (!isAnySpaceEmptyInBoard()) {
    return 0; // Count the coins - Announce the winner
  }

  printBoard();

  playerNumber = playerNumber % 2;
  console.log(getMessage(playerNumber));

  const row = getRow();
  const column = getColumn();

  if (!isRowColomnValid(row, column)) {
    // console.clear();
    return startOthello(playerNumber);
  }

  startProcessing(row, column, playerNumber);

  // console.clear();
  return startOthello(playerNumber + 1);
}

startOthello(2);
