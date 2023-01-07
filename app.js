const main = document.querySelector(".main");
const plevel = document.querySelector(".level");
const pscore = document.querySelector(".score");

let colors = [
  "yellow",
  "green",
  "red",
  "brown",
  "pink",
  "orange",
  "purple",
  "lime",
  "blue",
];
let level = 2;
let score = 0;
let dim = 85;
let width = 400;
let correct = new Audio("./saunds/Doğru ses efekti.mp3");
let wrong = new Audio("./saunds/yanlis sesi efekti.mp3");

plevel.textContent = level - 1;

function drawboard() {
  main.style.width = width + "px";
  if (level > 3) {
    dim = dim + 10;
    width = width + 400;
    main.style.width = width + "px";
  }

  for (let i = 0; i < level * 8; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("color", "");
    square.style.width = dim + "px";
    square.style.height = dim + "px";
    main.appendChild(square);
  }
  const squares = document.querySelectorAll(".main .square");
  let count = 0;
  let innercount = [];
  while (count < squares.length) {
    let index = Math.floor(Math.random() * squares.length);
    if (!innercount.includes(index)) {
      innercount.push(index);
      count++;
    }
  }

  let b = 0;
  count = 0;

  for (let i = 0; i < squares.length; i++) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    for (let f = 1; f <= 2; f++) {
      if (b < squares.length) {
        squares[innercount[b]].setAttribute("color", color);
        b++;
      }
    }
  }

  let c = 0;
  let selectedsquares = [];
  squares.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.classList.toggle("rotatesquare");
      e.target.style.background = item.getAttribute("color");
      selectedsquares.push(e.target);
      if (selectedsquares.length === 2) {
        if (
          selectedsquares[0].getAttribute("color") ===
          selectedsquares[1].getAttribute("color")
        ) {
          correct.play();
          correct.currentTime = 0;
          score = score + 5;
          pscore.textContent = score;
          count++;

          if (count === squares.length / 2) {
            level++;
            plevel.textContent = level - 1;
            main.innerHTML = "";
            drawboard();
          }
        } else {
          setTimeout(() => {
            selectedsquares[0].classList.toggle("rotatesquare");
            selectedsquares[0].style.background = "none";
            selectedsquares[1].classList.toggle("rotatesquare");
            selectedsquares[1].style.background = "none";
            selectedsquares = [];
          }, 500);

          wrong.play();
          wrong.currentTime = 0;
        }
        setTimeout(() => {
          selectedsquares = [];
        }, 600);
      }
    });
  });
}
drawboard();
