class Timer {
  constructor() {
    // Input Selectors
    this.hourInput = document.getElementById("hourInput");
    this.minuteInput = document.getElementById("minuteInput");
    this.secondInput = document.getElementById("secondInput");

    // Btn Selectors
    this.startCTA = document.getElementById("startCTA");
    this.pauseCTA = document.getElementById("pauseCTA");
    this.resetCTA = document.getElementById("resetCTA");

    // Values
    this.hourEle = document.getElementById("hourValue");
    this.minuteEle = document.getElementById("minuteValue");
    this.secondEle = document.getElementById("secondValue");

    // Constant Values
    this.timerID = null;
    // Input Values
    this.hourInputVal = 0;
    this.minuteInputVal = 0;
    this.secondInputVal = 0;

    // Bind Events
    this.bindEvent();
  }

  bindEvent = () => {
    this.hourInput.addEventListener("input", (e) => {
      this.hourInputVal = Number(e.target.value);
    });
    this.minuteInput.addEventListener("input", (e) => {
      this.minuteInputVal = Number(e.target.value);
    });
    this.secondInput.addEventListener("input", (e) => {
      this.secondInputVal = Number(e.target.value);
    });
    this.startCTA.addEventListener("click", () => {
      this.startTimer();
    });
    this.pauseCTA.addEventListener("click", () => {
      clearInterval(this.timerID);
    });
    this.resetCTA.addEventListener("click", () => {
      this.hourInputVal = 0;
      this.minuteInputVal = 0;
      this.secondInputVal = 0;
      clearInterval(this.timerID);
      this.updateTimerOnDOm();
      this.hourInput.value = "";
      this.minuteInput.value = "";
      this.secondInput.value = "";
    });
  };

  updateTimerOnDOm = () => {
    this.hourEle.innerHTML = ` hour ${this.hourInputVal}`;
    this.minuteEle.innerHTML = `Minute ${this.minuteInputVal}`;
    this.secondEle.innerHTML = `Second ${this.secondInputVal}`;
  };

  startTimer = () => {
    this.timerID = setInterval(() => {
      if (
        this.hourInputVal === 0 &&
        this.minuteInputVal === 0 &&
        this.secondInputVal === 0
      ) {
        this.hourInputVal = 0;
        this.minuteInputVal = 0;
        this.secondInputVal = 0;
        this.updateTimerOnDOm();
        clearInterval(this.timerID);
      } else if (this.minuteInputVal === 0 && this.secondInputVal === 0) {
        this.hourInputVal = this.hourInputVal - 1;
        this.minuteInputVal = 59;
        this.secondInputVal = 60;
        this.updateTimerOnDOm();
      } else if (this.secondInputVal === 0) {
        this.hourInputVal = this.hourInputVal;
        this.minuteInputVal = this.minuteInputVal - 1;
        this.secondInputVal = 60;
        this.updateTimerOnDOm();
      } else {
        this.hourInputVal = this.hourInputVal;
        this.minuteInput = this.minuteInput;
        this.secondInputVal = this.secondInputVal - 1;
        this.updateTimerOnDOm();
      }
    }, 10);
  };
}

new Timer();
