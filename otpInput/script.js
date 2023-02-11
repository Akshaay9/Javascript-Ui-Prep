class OtpInput {
  constructor() {
    // Selectors
    this.optInputContainer = document.getElementById("optInputContainer");
    this.otpText = document.getElementById("otpText");
    // COnstant and Vars
    this.totalOtp = 3;
    this.optTextVal = "";

    // functions
    this.gemerateOtpInputUi();
  }

  focusFun(num) {
    const a = document.querySelector(`[data-otp="${num}"]`);
    a.focus();
  }

  enterOtp(e) {
    const key = e.inputType;

    const val = e.target.value;
    let dataSetValue = Number(e.target.dataset.otp);
    const isBackSpacePressed = key === "deleteContentBackward";
    const jumpVal = isBackSpacePressed ? dataSetValue - 1 : dataSetValue + 1;
    this.optTextVal += val;
    if (jumpVal < 0) {
      document.querySelector(`[data-otp="${0}"]`).blur();
      return;
    }
    if (jumpVal === 4) {
      this.otpText.innerHTML = this.optTextVal;
      document.querySelector(`[data-otp="${3}"]`).blur();
    } else {
      this.focusFun(jumpVal);
    }
  }

  gemerateOtpInputUi() {
    for (let i = 0; i <= this.totalOtp; i++) {
      const inputEle = document.createElement("input");
      inputEle.classList.add("otpInput");
      inputEle.dataset["otp"] = i;
      inputEle.addEventListener("input", (e) => {
        this.enterOtp(e);
      });
      this.optInputContainer.appendChild(inputEle);
    }
  }
}

new OtpInput();
