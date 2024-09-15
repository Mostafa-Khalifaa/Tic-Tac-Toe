let currentPlayer = "X";
let numOfRows = 3;
const turns = numOfRows ** 2;
let turnsCount = 0;
const resetBtn = document.querySelector("#reset");

const boardArray = () => {
    let board = [];

    for (let row = 0; row < numOfRows; row++) {
        board.push(Array.from({ length: numOfRows }, () => "_"));
    }
    return board;
};

let board = boardArray();

const resetBoard = () => {
    document.querySelector(".board").remove();
    createBoard();
    board = boardArray();
    currentPlayer = "X";
    turnsCount = 0;
};

const checkRows = () => {
    let coulmn = 0;
    for (let row = 0; row < numOfRows; row++) {
        while (coulmn < numOfRows) {
            if (board[row][coulmn] != currentPlayer) {
                coulmn = 0;
                break;
            }
            coulmn++;
        }
        if (coulmn === numOfRows) {
            return true;
        }
    }
};
const checkColumns = () => {
    let row = 0;
    for (let coulmn = 0; coulmn < numOfRows; coulmn++) {
        while (row < numOfRows) {
            if (board[row][coulmn] != currentPlayer) {
                row = 0;
                break;
            }
            row++;
        }
        if (row === numOfRows) {
            return true;
        }
    }
};
const checkDiagonals = () => {
    let count = 0;

    while (count < numOfRows) {

        if (board[count][count] != currentPlayer) {
            count = 0;
            break;
        }
        count++;
    }
    if (count === numOfRows) {
        return true;
    }

};
const checkReverseDiagonals = () => {
    let count = 0;

    while (count < numOfRows) {

        if (board[count][numOfRows - count - 1] != currentPlayer) {
            count = 0;
            break;
        }
        count++;
    }
    if (count === numOfRows) {
        return true;
    }
};

const checkWin = (currentPlayer) => {

    if (checkRows(currentPlayer)) return true;

    if (checkColumns(currentPlayer)) return true;

    if (checkDiagonals(currentPlayer)) return true;

    if (checkReverseDiagonals(currentPlayer)) return true;

};

const runWinEvent = (currentPlayer) => {
    setTimeout(() => {
        alert("Player" + " " + currentPlayer + " " + "won!");
        resetBoard();

    }, 100);
};

const runDrawEvent = () => {
    setTimeout(() => {
        alert("Draw!!");
        resetBoard();

    }, 100);
};


const getCellPlace = (index, numRows) => {

    const row = Math.floor(index / numRows);
    const coulmn = index % numRows;

    return [row, coulmn];
};

const cellClickHandler = (event, index) => {
    const cell = event.target;
    const [row, coulmn] = getCellPlace(index, numOfRows);

    if (board[row][coulmn] === "_") {

        turnsCount++;
        board[row][coulmn] = currentPlayer;
        cell.querySelector(".value").textContent = currentPlayer;
        cell.classList.add(`cell--${currentPlayer}`);


        if (checkWin(currentPlayer)) {
            runWinEvent(currentPlayer);
        } else {
            if (turnsCount === turns) {
                runDrawEvent();

            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";

        }

    }

};

const createBoard = () => {
    const container = document.querySelector(".container");
    const board = document.createElement("div");

    board.classList.add("board");
    for (let i = 0; i < turns; i++) {
        const cellElString = `<div class="cell" role="button" tabindex="${i + 1}"><span class="value"></span></div>`;
        const cellEl = document.createRange().createContextualFragment(cellElString);

        cellEl.querySelector(".cell").onclick = (event) => cellClickHandler(event, i);
        cellEl.querySelector(".cell").onkeydown = (event) => event.key === "Enter" ? cellClickHandler(event, i) : true;

        board.appendChild(cellEl);
        document.documentElement.style.setProperty("--grid-rows", numOfRows);

    }
    container.insertAdjacentElement("afterbegin", board);
};
createBoard();
resetBtn.addEventListener("click", resetBoard);