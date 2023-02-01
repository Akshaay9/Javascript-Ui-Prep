class Timer {
  constructor() {
    // Selectors
    this.startCTA = document.getElementById("StartCTA");
    this.range = document.getElementById("range");

    // Constants and Variables
    this.totalTime = 10000;
    this.timerID = null;
    this.startTimerVal = null;

    this.bindEvent();
  }
  bindEvent() {
    this.startCTA.addEventListener("click", () => {
      this.startTimer();
    });
  }

  startTimer = () => {
    this.timerID = setInterval(() => {
      if (this.startTimerVal == null) {
        this.startTimerVal = Date.now();
      }
      const percentage =
        ((Date.now() - this.startTimerVal) / this.totalTime) * 100;
      this.updateStyle(percentage);
      if (percentage >= 100) {
        this.startTimerVal = null;
        clearInterval(this.timerID);
        this.updateStyle(0);
      }
    }, 1000 / 360);
  };

  pauseTimer = () => {};

  updateStyle = (perc) => {
    this.range.style.width = `${perc}%`;
  };
}
new Timer();
