// Selections
const positionTB = document.getElementById("position-tb");
const positionLR = document.getElementById("position-lr");

const toastType = document.getElementById("type");
const toastRange = document.getElementById("range-second");

// CTA
const addToast = document.getElementById("add-Toast");

//  template
const toastTemplate = document.getElementById("toast-template");

const removeToast = (elemnt) => {};

const showToast = () => {
  const newTemplate = document.createElement("div");
  const p = document.createElement("p");
  p.innerHTML = "This is a Toast";
  const button = document.createElement("button");
  newTemplate.appendChild(p);
  button.innerHTML = `x`;
  newTemplate.appendChild(button);
  newTemplate.classList.add("toast");

  if (toastType.value === "success") {
    newTemplate.classList.add("success");
  } else {
    newTemplate.classList.add("error");
  }

  if (positionTB.value === "top" && positionLR.value === "right") {
    document.getElementById("topRight").appendChild(newTemplate);
  } else if (positionTB.value === "top" && positionLR.value === "left") {
    document.getElementById("topLeft").appendChild(newTemplate);
  } else if (positionTB.value === "bottom" && positionLR.value === "right") {
    document.getElementById("bottomRight").prepend(newTemplate);
  } else {
    document.getElementById("bottomLeft").prepend(newTemplate);
  }
  button.addEventListener("click", () => {
    newTemplate.remove();
  });

  setTimeout(() => {
    newTemplate.remove();
  }, toastRange?.value * 1000);
};

addToast.addEventListener("click", () => {
  showToast();
});
