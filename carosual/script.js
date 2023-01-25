class Carousal {
  constructor(images) {
    // Data
    this.images = images;
    // Selector
    this.carosualContainer = document.getElementById("carosualContainer");
    this.leftSwipe = document.getElementById("leftSwipe");
    this.rightSwipe = document.getElementById("rightSwipe");

    //
    this.imagesCount = this.images.length;
    this.currentImagePosition = 0;
    this.timesID = null;
    this.scrollLength = -480;

    // Generate UI
    this.generateImage();
    this.startTimer();

    //  Bind Events
    this.carosualContainer.addEventListener("mouseenter", () => {
      clearInterval(this.timesID);
    });
    this.carosualContainer.addEventListener("mouseleave", () => {
      this.startTimer();
    });

    this.rightSwipe.addEventListener("click", () => {
      clearInterval(this.timesID);
      this.currentImagePosition =
        (this.currentImagePosition + 1) % this.imagesCount;
      this.updateScrollPosition(this.currentImagePosition * this.scrollLength);
      this.startTimer();
    });

    this.leftSwipe.addEventListener("click", () => {
      clearInterval(this.timesID);
      let newPosition = this.currentImagePosition - 1;
      if (newPosition < 0) {
        newPosition = this.images.length - 1;
      }
      this.currentImagePosition = newPosition;
      this.updateScrollPosition(this.currentImagePosition * this.scrollLength);
      this.startTimer();
    });
  }
  generateImage = () => {
    this.images.forEach((ele) => {
      const imageEle = document.createElement("img");
      imageEle.classList.add("img");
      imageEle.src = ele;
      this.carosualContainer.appendChild(imageEle);
    });
  };

  startTimer = () => {
    this.timesID = setInterval(() => {
      this.currentImagePosition =
        (this.currentImagePosition + 1) % this.imagesCount;
      this.updateScrollPosition(this.currentImagePosition * this.scrollLength);
    }, 2000);
  };

  updateScrollPosition = (pos) => {
    this.carosualContainer.style.transform = "translateX(" + pos + "px" + ")";
  };
}

const images = [
  "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1674585714925-c096ba706a97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1674584546139-e657d8ba2390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1674561621616-42702bf1fbae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
];

new Carousal(images);
