class StarRating {
    constructor() {
      //  Constants
      this.totalStars = 4;
      this.currStarChecked = -1;
  
      // Selectos
      this.startContainer = document.getElementById("stars");
      this.totalStarChecked = document.getElementById("totalStarChecked");
  
      // funmctions
      this.generateStarsUI();
    }
  
    generateStarsUI() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < this.totalStars; i++) {
        const star = document.createElement("i");
        star.classList.add("fa");
        star.classList.add("fa-star");
        star.dataset.rating = i;
        fragment.appendChild(star);
      }
      this.startContainer.appendChild(fragment);
      this.startContainer.addEventListener("mouseover", (e) => {
        this.mouseOverHandler(e);
      });
      this.startContainer.addEventListener("click", (e) => {
        this.mouseClickHandler(e);
      });
      this.startContainer.addEventListener("mouseleave", (e) => {
        this.mouseLeaveHandler(e);
      });
    }
  
    //    MouseOver
    mouseOverHandler(e) {
      const target = e?.target?.dataset?.["rating"];
      this.paintStars(target);
    }
  
    // MouseClick
    mouseClickHandler(e) {
      const target = e?.target?.dataset?.["rating"];
      this.updateTarget(target);
    }
  
    // mouseLeave
    mouseLeaveHandler() {
      console.log(this.currStarChecked);
      this.paintStars(this.currStarChecked);
    }
  
    updateTarget(target) {
      this.currStarChecked = target;
      this.paintStars(this.currStarChecked);
    }
  
    paintStars(target) {
      for (let i = 0; i < this.totalStars; i++) {
        const el = document.querySelector(`[data-rating="${i}"]`);
        if (Number(i) <= Number(target)) {
          el.classList.add("checked");
        } else {
          el.classList.remove("checked");
        }
      }
    }
  }
  
  new StarRating();
  