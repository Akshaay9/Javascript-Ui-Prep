class Toast {
  constructor() {
    // Selector
    this.toastContainer = document.getElementById("toastContainer");
    this.toastCTA = document.getElementById("toastCTA");
    // consts amd vars
    this.toastData = [];
    this.generateUI();
    this.bindEvent();
  }
  generateUI = () => {
    this.toastContainer.innerHTML = "";
    this.toastData.map(({ id, text }) => {
      new ToastUI(id, text, this.toastContainer, this.deleteToast);
    });
  };
  bindEvent() {
    this.toastCTA.addEventListener("click", () => {
      const newToastData = {
        id: Math.random(),
        text: `Hey ! This is a New Toast ${this.toastData.length}`,
      };
      this.toastData = [...this.toastData, newToastData];
      this.generateUI();
    });
  }
  deleteToast = (id) => {
    this.toastData = this.toastData.filter((ele) => ele.id !== id);
    this.generateUI();
  };
}

class ToastUI {
  constructor(id, text, container, deleteToast) {
    this.id = id;
    this.text = text;
    this.container = container;
    this.deleteToast = deleteToast;
    this.timerID = null;
    this.generateEle();
    this.timerDeleteToast();
  }
  generateEle() {
    const div = document.createElement("div");
    div.classList.add("toast");
    const p = document.createElement("p");
    p.innerHTML = this.text;
    const button = document.createElement("button");
    button.innerHTML = "x";
    button.addEventListener("click", () => {
      this.deleteToast(this.id);
    });
    div.appendChild(p);
    div.appendChild(button);
    this.container.prepend(div);
  }
  timerDeleteToast() {
    this.timerID = setTimeout(() => {
      this.deleteToast(this.id);
    }, 5000);
  }
}

new Toast();
