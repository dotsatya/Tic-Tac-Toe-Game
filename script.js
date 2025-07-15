let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
// let turn = "X";
let turnO = true;
let msg = document.querySelector(".msg_container");

let oCount = 0;
let xCount = 0;

const oCounter = document.querySelector("#o_count");
const xCounter = document.querySelector("#x_count");

const winPatterns = [
  [0, 1, 2]
  , [3, 4, 5]
  , [6, 7, 8]
  , [0, 3, 6]
  , [1, 4, 7]
  , [2, 5, 8]
  , [0, 4, 8]
  , [2, 4, 6]
]

boxes.forEach((box) => {
  box.addEventListener("click", () => {
     if (gameOver || box.innerText !== "") return; // Prevent moves after game over or on filled boxes
    if (turnO) {
      box.innerText = "⭕";
      turnO = false;
    }
    else {
      box.innerText = "❌";
      turnO = true;
    }
    box.disabled = true;
    checkWin();
  });
});


const checkWin = () => {

  let winnerFound = false;

  for (let pattern of winPatterns) {
    let positionValue1 = boxes[pattern[0]].innerText;
    let positionValue2 = boxes[pattern[1]].innerText;
    let positionValue3 = boxes[pattern[2]].innerText;
    if (
      positionValue1 == positionValue2 &&
      positionValue1 == positionValue3 &&
      positionValue1 != ""
    ) {
      msg.innerHTML = `🎉 Congratulations!<br>🏆 Winner is ${positionValue1} !!! 🎊`;
      boxes[pattern[0]].style.backgroundColor = "rgba(142, 142, 142, 1)";
      boxes[pattern[1]].style.backgroundColor = "rgba(142, 142, 142, 1)";
      boxes[pattern[2]].style.backgroundColor = "rgba(142, 142, 142, 1)";
      gameOver = true;
      winnerFound = true;

      if (positionValue1 === "⭕") {
        oCount++;
        oCounter.innerText = oCount;
      }
      else if (positionValue1 === "❌") {
        xCount++;
        xCounter.innerText = xCount;
      }
      break;
    }
  }
  // Draw detection
  if (!winnerFound && Array.from(boxes).every(box => box.innerText !== "")) {
    msg.innerHTML = "It's a draw! 🤝";
    gameOver = true;
  }
}


let gameOver = false;

reset.addEventListener("click", () => {
  if (gameOver) {
    boxes.forEach((box) => {
      box.innerText = "";
      box.disabled = false;
      box.style.backgroundColor = "transparent";
      msg.innerText = "Now ? 😀";
    });
    turnO = true;
    gameOver = false;
  }
});

