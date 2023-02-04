class ChessBoard {
  constructor(row, col) {
    this.totalRows = row;
    this.totalColumns = col;
    this.columnData = {};

    //  Selectors
    this.board = document.getElementById("board");

    // Funcations
    this.generateBoard();
    this.bindEvent();
  }

  generateAllDiagonals(row, col) {
    const maxRowLength = this.totalRows;
    const maxColLength = this.totalColumns;
    // Bottom Left
    let bottomLeftRow = row;
    let bottomLeftCom = col;
    while (bottomLeftRow >= 0 && bottomLeftCom >= 0) {
      this.columnData[`${bottomLeftRow}_${bottomLeftCom}`] = true;
      bottomLeftCom -= 1;
      bottomLeftRow -= 1;
    }
    //  Bottom Right
    let bottomRightRow = row;
    let bottomRightCol = col;
    while (bottomRightRow >= 0 && bottomRightCol < maxColLength) {
      this.columnData[`${bottomRightRow}_${bottomRightCol}`] = true;

      bottomRightRow--;
      bottomRightCol++;
    }

    // Top Left
    let topLeftRow = row;
    let topLeftCom = col;
    while (topLeftRow < maxRowLength && topLeftCom >= 0) {
      this.columnData[`${topLeftRow}_${topLeftCom}`] = true;
      topLeftRow += 1;
      topLeftCom -= 1;
    }
    // Top RIght
    let topRightRow = row;
    let topRightCom = col;
    while (topRightRow < maxRowLength && topRightCom < maxColLength) {
      this.columnData[`${topRightRow}_${topRightCom}`] = true;
      topRightRow += 1;
      topRightCom += 1;
    }

    this.generateBoard();
  }

  bindEvent() {
    this.board.addEventListener("click", (e) => {
      this.columnData = {};
      const [row, col] = e.target.dataset.boardKey.split("_") || "";
      const selectedRow = Number(row);
      const selectedCol = Number(col);
      this.generateAllDiagonals(selectedRow, selectedCol);
    });
  }

  generateBoard() {
    this.board.innerHTML = "";
    for (let i = 0; i < this.totalRows; i++) {
      let startColor = i % 2 === 0 ? "white" : "black";
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < this.totalColumns; j++) {
        const key = `${i}_${j}`;
        const column = document.createElement("div");
        column.classList.add("column");
        column.dataset["boardKey"] = key;
        row.appendChild(column);
        if (this.columnData[key]) {
          column.classList.add("red");
        } else {
          column.classList.add(startColor);
        }

        if (startColor === "white") {
          startColor = "black";
        } else {
          startColor = "white";
        }
      }
      this.board.appendChild(row);
    }
  }
}

new ChessBoard(7, 12);
