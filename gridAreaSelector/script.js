// 7,11

class GridPixelArt {
  constructor(row, column) {
    //  Constant and Variable
    this.row = row;
    this.column = column;

    this.startPointRow = null;
    this.startPointColumn = null;

    this.endPointRow = null;
    this.endPointColumn = null;

    //  Selectos
    this.board = document.getElementById("board");

    // funcitons
    this.generateBoard();
    this.bindEVvent();
  }
  bindEVvent() {
    this.board.addEventListener("mousedown", (e) => {
      const className = e.target.className;
      if (className === "column") {
        const [row, column] = e.target.dataset.id.split("_");
        this.startPointRow = row;
        this.startPointColumn = column;
        this.endPointRow = row;
        this.endPointColumn = column;
        this.colorBoard();
      }
    });
  }
  mouseEnterColumn(e) {
    const className = e.target.className;
    if (this.startPointRow && this.startPointColumn && className === "column") {
      const [row, column] = e.target.dataset.id.split("_");

      // max
      this.endPointRow = row;
      this.endPointColumn = column;
      // Start
      this.startPointRow = Math.min(this.startPointRow, this.endPointRow);
      this.startPointColumn = Math.min(
        this.startPointColumn,
        this.endPointColumn
      );
      this.colorBoard();
    }
  }

  colorBoard() {
    for (let i = this.startPointRow; i <= this.endPointRow; i++) {
      for (let j = this.startPointColumn; j <= this.endPointColumn; j++) {
        const key = `${i}_${j}`;

        const column = document.querySelector(`[data-id="${key}"]`);
        column.classList.add("skyBlue");
      }
    }
  }

  generateBoard() {
    for (let i = 0; i < this.row; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      row.dataset["rowId"] = i;
      for (let j = 0; j < this.column; j++) {
        const column = document.createElement("div");
        column.classList.add("column");
        column.dataset["id"] = `${i}_${j}`;
        column.addEventListener("mouseenter", (e) => {
          this.mouseEnterColumn(e);
        });
        row.appendChild(column);
      }
      this.board.appendChild(row);
    }
  }
}

new GridPixelArt(7, 11);
