class TicTakToe {
  constructor() {
    this.data = Array(9).fill(null);
    this.currPlayer = "A";

    // Selector
    this.container = document.getElementById("container");
    this.currentPlayerEle = document.getElementById("currentPlayer");

    this.generateUi();
  }

  getWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  updateDomPlayer(Val) {
    this.currentPlayerEle.innerHTML = Val;
  }

  colClick(position) {
    const mark = this.currPlayer === "A" ? "x" : "o";
    this.data[position] = mark;
    this.generateUi();

    const isWinnerFound = this.getWinner(this.data);
    if (isWinnerFound) {
      this.updateDomPlayer(`${this.currPlayer} Won !!!!`);
      this.container.style.pointerEvents = "none";
      return;
    }

    const isGameDrawn = this.data.indexOf(null);
    if (isGameDrawn === -1) {
      this.updateDomPlayer("Drawn");
      return;
    }

    if (this.currPlayer === "A") {
      this.currPlayer = "B";
    } else {
      this.currPlayer = "A";
    }
    this.updateDomPlayer(`Player ${this.currPlayer}`);
  }

  generateUi() {
    this.container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("row");
      row.classList.add("row");
      for (let i = 0; i < 3; i++) {
        const col = document.createElement("col");
        col.classList.add("col");
        col.dataset.i = count;
        col.innerHTML = this.data[count] || "";
        col.addEventListener("click", (e) => {
          if (this.data[Number(col.dataset.i)]) return;
          this.colClick(Number(col.dataset.i));
        });
        count += 1;
        row.appendChild(col);
      }
      this.container.appendChild(row);
    }
  }
}
new TicTakToe();
