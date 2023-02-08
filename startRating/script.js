class STarHoover {
  constructor(data) {
    // Selector
    this.startContainer = document.getElementById("startContainer");

    // Variables
    this.startData = data;
    this.starSelected = -1;

    // Fun invocation
    this.genUI();
    this.bindEvent();
  }

  selectStart(id) {
    this.startData = this.startData.map((ele) =>
      ele.i <= id ? { ...ele, selected: true } : { ...ele, selected: false }
    );
    this.genUI();
  }

  bindEvent() {
    this.startContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-star")) {
        const dataSet = Number(e.target.dataset.id);
        this.starSelected = dataSet;
        this.selectStart(dataSet);
      }
    });

    
  }

  genUI() {
    this.startContainer.innerHTML = "";
    for (let i = 0; i < this.startData.length; i++) {
      const startEle = document.createElement("i");
      startEle.classList.add("fa-regular");
      startEle.classList.add("fa-star");
      startEle.dataset["id"] = i;
      if (this.startData[i].selected) {
        startEle.classList.add("selected");
      }
      this.startContainer.appendChild(startEle);
    }
  }
}

const data = [
  {
    i: 0,
    selected: false,
  },
  {
    i: 1,
    selected: false,
  },
  {
    i: 2,
    selected: false,
  },
  {
    i: 3,
    selected: false,
  },
  {
    i: 4,
    selected: false,
  },
];

new STarHoover(data);
