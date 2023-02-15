const data = [
  {
    id: 0,
    text: "Hey Akshay Wssup How Are you?",
  },
  {
    id: 1,
    text: "Mark mason book subtle art of not",
  },
  {
    id: 2,
    text: "Giving a damn is damn good book bro",
  },
  {
    id: 3,
    text: "Oh really then i definately need to reead it",
  },
  {
    id: 4,
    text: "Yes its a must read for everyone",
  },
  {
    id: 5,
    text: "Thanks for recommending Akshay you go",
  },
];

class AutoPrefill {
  constructor(data) {
    this.data = data;
    this.text = "";
    this.timerID = null;
    this.currentFocusedEle = null;
    this.currentFocusibleChildren = null;
    // selector
    this.input = document.getElementById("input");
    this.autoprefillContainer = document.getElementById("autoprefill");

    //  Bind Event
    this.bindEvent();
  }

  debounce(fn, args) {
    clearTimeout(this.timerID);
    let context = this;
    this.timerID = setTimeout(function () {
      fn.call(context, args);
    }, 1000);
  }

  getAllPrefilledChildren() {
    const children = this.autoprefillContainer.childElementCount;
    this.currentFocusibleChildren = children;
    this.currentFocusedEle = -1;
  }
  focusEle(id) {
    const a = document.querySelector(`[data-id="${id}"]`);
    console.log(a);
    // a.focus();
  }

  bindEvent() {
    this.input.addEventListener("input", (e) => {
      const val = e.target.value;
      this.text = val;
      this.debounce(this.getInputtedData, val);
    });
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 50) {
        if (this.currentFocusedEle === null) {
          this.getAllPrefilledChildren();
        }
        this.currentFocusedEle =
          (this.currentFocusedEle + 1) % this.currentFocusibleChildren;
        const a = document.querySelector(
          `[data-id="${this.currentFocusedEle}"]`
        );
      }
    });
  }

  getInputtedData(input) {
    let newData = [...this.data];
    newData = newData.filter((ele) =>
      ele.text.toString().toLowerCase().includes(input.toString().toLowerCase())
    );

    this.renderData(input, newData);
  }

  renderData(input, data) {
    this.autoprefillContainer.innerHTML = "";
    if (!input) {
      return;
    }
    if (input && data.length === 0) {
      this.autoprefillContainer.innerHTML = `No Data Found`;
    }
    data.forEach((ele) => {
      const { id, text } = ele;
      const pTag = document.createElement("p");
      pTag.innerHTML = `${text}`;
      pTag.dataset.id = id;
      pTag.tabIndex = id;

      this.autoprefillContainer.appendChild(pTag);
    });
  }
}

new AutoPrefill(data);
