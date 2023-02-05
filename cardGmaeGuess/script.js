class CardGame {
  constructor() {
    // Selector
    this.cardContainer = document.getElementById("cardContainer");
    this.scoreEl = document.getElementById("score");

    // Constant and vars
    this.totalCount = 1;
    this.score = 0;
    this.cardNumToBeGuessed = [];

    // Functions
    this.generateCard();
    this.startGame();
    this.bindEvent();
  }

  clear() {
    this.totalCount = 1;
    this.score = 0;
    this.cardNumToBeGuessed = [];
    this.scoreEl.innerHTML = `${this.score}`;
    this.startGame();
  }

  bindEvent() {
    this.cardContainer.addEventListener("click", (e) => {
      const cardVal = Number(e.target.dataset.cardId);
      const cardValTooBeSelected = this.cardNumToBeGuessed.shift();

      if (cardVal !== cardValTooBeSelected) {
        this.cardContainer.classList.add("shake");
        setTimeout(() => {
          this.cardContainer.classList.remove("shake");
        }, 250);
        this.clear();
        return;
      }
      if (this.cardNumToBeGuessed.length === 0) {
        this.totalCount += 1;
        this.score += 1;
        this.scoreEl.innerHTML = `${this.score}`;
        this.startGame();
      }
    });
  }

  generateCard() {
    for (let i = 0; i < 4; i++) {
      const card = document.createElement("div");
      card.dataset["cardId"] = i;
      card.classList.add("card");
      this.cardContainer.appendChild(card);
    }
  }
  sleep() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 750);
    });
  }

  async startGame() {
    for (let i = 0; i < this.totalCount; i++) {
      const randomNumber = Math.floor(Math.random() * 3);
      this.cardNumToBeGuessed.push(randomNumber);
      const card = document.querySelector(`[data-card-Id="${randomNumber}"]`);
      await this.sleep();
      card.classList.add("grow");
      await this.sleep();
      card.classList.remove("grow");
    }
  }
}

new CardGame();
