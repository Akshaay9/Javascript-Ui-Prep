class Timer {
  constructor() {
    // Selectors
    this.startCTA = document.getElementById("StartCTA");
    this.range = document.getElementById("range");
    this.queueEl = document.getElementById("queueVal");

    // Constants and Variables
    this.totalTime = 5000;
    this.timerID = null;
    this.startTimerVal = null;
    this.queueVal = 0;

    this.bindEvent();
  }
  bindEvent() {
    this.startCTA.addEventListener("click", () => {
      this.queueVal += 1;
      if (this.queueVal === 1) {
        this.startTimer();
      }
      this.updateStyle(this.queueVal, "queue");
    });
  }

  startTimer = () => {
    this.timerID = setInterval(() => {
      if (this.startTimerVal === null) {
        this.startTimerVal = Date.now();
      }
      const percentage =
        ((Date.now() - this.startTimerVal) / this.totalTime) * 100;
      this.updateStyle(percentage, "width");

      if (percentage >= 100) {
        clearInterval(this.timerID);
        this.updateStyle(0, "width");
        this.queueVal -= 1;
        this.startTimerVal = null;
        this.updateStyle(this.queueVal, "queue");
        if (this.queueVal === 0) {
          return;
        } else {
          this.startTimer();
        }
      }
    }, 1000 / 360);
  };

  updateStyle = (perc, ele) => {
    if (ele === "width") {
      this.range.style.width = `${perc}%`;
    } else if (ele === "queue") {
      this.queueEl.innerHTML = perc;
    }
  };
}
new Timer();
