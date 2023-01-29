class RangeTimer {
  constructor() {
    // selectors
    this.range = document.getElementById("range");
    this.startCTA = document.getElementById("startCTA");
    this.pauseCTA = document.getElementById("pauseCTA");
    this.resetCTA = document.getElementById("resetCTA");

    // Constants and Variabled
    this.timerId = null;
    this.startTime = 0;
    this.endTime = 50;
    this.currPercentage = 0;

    // Functions
    this.bindEvent();
  }

  bindEvent = () => {
    this.startCTA.addEventListener("click", () => {
      this.startRange();
    });
    this.pauseCTA.addEventListener("click", () => {
      clearInterval(this.timerId);
    });
    this.resetCTA.addEventListener("click", () => {
      this.currPercentage = 0;
      this.startTime = 0;
      clearInterval(this.timerId);
      this.updateDom();
    });
  };
  updateDom = () => {
    this.range.style.width = `${this.currPercentage}%`;
  };

  startRange = () => {
    this.timerId = setInterval(() => {
      if (this.startTime === this.endTime) {
        this.currPercentage = 0;
        this.startTime = 0;
        clearInterval(this.timerId);
      }
      this.updateDom();
      this.startTime += 1;
      this.currPercentage = Math.floor((this.startTime / this.endTime) * 100);
    }, 100);
  };

  pauseRange = () => {};
  resetRange = () => {};
}

new RangeTimer();
