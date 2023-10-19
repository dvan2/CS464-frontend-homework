// Add your code here
let nIntervId;
addEventListener("load", handleLoad());

function handleLoad() {
  const btnElem = document.querySelector("button");
  btnElem.addEventListener("click", start);
}

function start() {
  const btnElem = document.querySelector("button");
  const user_input = document.querySelector("select").value;
  if (btnElem.classList.contains("start")) {
    btnElem.classList.remove("start");
    btnElem.classList.remove("btn-danger");
    btnElem.classList.add("btn-primary");
    btnElem.innerHTML = "Start";
    clearInterval(nIntervId);
  } else {
    btnElem.classList.add("start");
    btnElem.classList.remove("btn-primary");
    btnElem.classList.add("btn-danger");
    btnElem.innerHTML = "Stop";

    nIntervId = setInterval(myTimer, user_input * 1000);
  }
}

function randomColor() {
  //source: https://css-tricks.com/snippets/javascript/random-hex-color/
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function myTimer() {
  const bodyElem = document.querySelector("body");
  bodyElem.style.backgroundColor = `${randomColor()}`;
}
