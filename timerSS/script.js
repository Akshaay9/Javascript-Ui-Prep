class Timer {
  constructor() {
    // Selectors
    this.timerInput = document.getElementById("timerInput");
    this.startTimerCTA = document.getElementById("startTimerCTA");
    this.hourVal = document.getElementById("hourVal");
    this.minuteVal = document.getElementById("minuteVal");
    this.secondVal = document.getElementById("secondVal");

    // Constants
    this.timerID = null;
    this.secondInputVal = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;

    // functions
    this.bindEvents();
  }
  bindEvents = () => {
    this.timerInput.addEventListener("input", (e) => {
      const val = e.target.value;
      this.secondInputVal = Number(val);
      this.converSecodToHHMMSS();
    });
    this.startTimerCTA.addEventListener("click", () => {
      this.startTimer();
    });
  };

  converSecodToHHMMSS = () => {
    const d = this.secondInputVal;
    this.hour = Math.floor(d / 3600);
    this.minute = Math.floor((d % 3600) / 60);
    this.second = Math.floor((d % 3600) % 60);
    this.updateDom();
  };

  updateDom = () => {
    this.hourVal.innerHTML = `Hour : ${this.hour}`;
    this.minuteVal.innerHTML = `Min : ${this.minute}`;
    this.secondVal.innerHTML = `Sec : ${this.second}`;
  };

  startTimer = () => {
    this.timerID = setInterval(() => {
      if (this.secondInputVal === 0) {
        clearInterval(this.secondInputVal);
        this.secondInputVal = 0;
        this.converSecodToHHMMSS();
      } else {
        this.secondInputVal = this.secondInputVal - 1;
        this.converSecodToHHMMSS();
      }
    }, 10);
  };
}

new Timer();
