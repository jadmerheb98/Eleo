const correctPassword = "BHEBIK";
const correctAnswer = "ALBO LA ALBE";
const correctNotesCode = "986";

const puzzleSize = 4;
let puzzleOrder = [];
let selectedPiece = null;

function normalizeText(text) {
  return text.trim().toUpperCase().replace(/\s+/g, " ");
}

function showScreen(screenId) {
  const screens = [
    "gamesHomeScreen",
    "passwordScreen",
    "questionScreen",
    "letterScreen",
    "proofScreen",
    "puzzleScreen",
    "codeScreen",
    "secondLetterScreen",
    "thousandScreen"
  ];

  screens.forEach(id => {
    const screen = document.getElementById(id);
    if (screen) screen.classList.add("hidden");
  });

  document.getElementById(screenId).classList.remove("hidden");
}

function checkPassword() {
  const input = normalizeText(document.getElementById("passwordInput").value);
  const errorMsg = document.getElementById("passwordError");

  if (input === correctPassword) {
    showScreen("questionScreen");
  } else {
    errorMsg.textContent = "Wrong password 😜";
  }
}

function checkAnswer() {
  const input = normalizeText(document.getElementById("answerInput").value);
  const errorMsg = document.getElementById("answerError");

  if (input === correctAnswer) {
    showScreen("letterScreen");
  } else {
    errorMsg.textContent = "Hmm la2 😌❤️";
  }
}

function startPuzzle() {
  showScreen("puzzleScreen");

  if (puzzleOrder.length === 0) {
    createPuzzle();
  }
}

function createPuzzle() {
  const totalPieces = puzzleSize * puzzleSize;
  puzzleOrder = Array.from({ length: totalPieces }, (_, i) => i);
  shufflePuzzle();
}

function shufflePuzzle() {
  const totalPieces = puzzleSize * puzzleSize;
  puzzleOrder = Array.from({ length: totalPieces }, (_, i) => i);

  for (let i = puzzleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [puzzleOrder[i], puzzleOrder[j]] = [puzzleOrder[j], puzzleOrder[i]];
  }

  if (isPuzzleSolved()) {
    [puzzleOrder[0], puzzleOrder[1]] = [puzzleOrder[1], puzzleOrder[0]];
  }

  selectedPiece = null;
  renderPuzzle();
}

function renderPuzzle() {
  const board = document.getElementById("puzzleBoard");
  board.innerHTML = "";

  puzzleOrder.forEach((pieceNumber, currentPosition) => {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.dataset.position = currentPosition;

    const row = Math.floor(pieceNumber / puzzleSize);
    const col = pieceNumber % puzzleSize;

    piece.style.backgroundPosition =
      `${(col / (puzzleSize - 1)) * 100}% ${(row / (puzzleSize - 1)) * 100}%`;

    piece.addEventListener("click", () => selectPuzzlePiece(currentPosition));
    board.appendChild(piece);
  });
}

function selectPuzzlePiece(position) {
  const allPieces = document.querySelectorAll(".puzzle-piece");

  if (selectedPiece === null) {
    selectedPiece = position;
    allPieces[position].classList.add("selected");
    return;
  }

  if (selectedPiece === position) {
    allPieces[position].classList.remove("selected");
    selectedPiece = null;
    return;
  }

  [puzzleOrder[selectedPiece], puzzleOrder[position]] =
    [puzzleOrder[position], puzzleOrder[selectedPiece]];

  selectedPiece = null;
  renderPuzzle();

  if (isPuzzleSolved()) {
    setTimeout(() => {
      document.getElementById("notesModal").classList.remove("hidden");
    }, 450);
  }
}

function isPuzzleSolved() {
  return puzzleOrder.every((pieceNumber, index) => pieceNumber === index);
}

function openCodeScreen() {
  document.getElementById("notesModal").classList.add("hidden");
  showScreen("codeScreen");
}

function checkNotesCode() {
  const input = normalizeText(document.getElementById("notesCodeInput").value);
  const errorMsg = document.getElementById("notesCodeError");

  if (input === correctNotesCode) {
    showScreen("secondLetterScreen");
  } else {
    errorMsg.textContent = "Wrong code 😜";
  }
}

document.getElementById("passwordInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkPassword();
});

document.getElementById("answerInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkAnswer();
});

document.getElementById("notesCodeInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkNotesCode();
});

function startThousandGame() {
  document.getElementById("thousandIntro").classList.add("hidden");
  document.getElementById("heartPuzzle").classList.remove("hidden");
}

let selectedHearts = [];
const correctHearts = ["in", "every", "life", "i", "will", "always", "choose", "you", "again"];

function chooseHeart(word) {
  selectedHearts.push(word);
  document.getElementById("heartProgress").textContent = selectedHearts.join(" ❤️ ");

  const currentIndex = selectedHearts.length - 1;

  if (selectedHearts[currentIndex] !== correctHearts[currentIndex]) {
    document.getElementById("heartError").textContent = "Wrong order 😭";
    setTimeout(() => {
      resetHearts();
    }, 1000);
    return;
  }

  if (selectedHearts.length === correctHearts.length) {
    document.getElementById("heartError").textContent = "Piece collected ❤️";
    setTimeout(() => {
      document.getElementById("heartPuzzle").classList.add("hidden");
      document.getElementById("mazePuzzle").classList.remove("hidden");
      createMaze();
    }, 800);
  }
}

function resetHearts() {
  selectedHearts = [];
  document.getElementById("heartProgress").textContent = "none";
  document.getElementById("heartError").textContent = "";
}

const mazeLayout = [
  ["start","","wall","","","","wall","",""],
  ["wall","","wall","","wall","","wall","","wall"],
  ["","","","","wall","","","",""],
  ["","wall","wall","","wall","wall","wall","wall",""],
  ["","","wall","","","","","",""],
  ["wall","","wall","wall","wall","","wall","wall",""],
  ["","","","","wall","","","","wall"],
  ["","wall","wall","","wall","wall","wall","",""],
  ["","","wall","","","","","", "goal"]
];

let playerPosition = { row:0, col:0 };

function createMaze() {
  const board = document.getElementById("mazeBoard");
  board.innerHTML = "";

  mazeLayout.forEach((row,rowIndex)=>{
    row.forEach((cell,colIndex)=>{
      const div = document.createElement("div");
      div.classList.add("maze-cell");

      if(cell === "wall") div.classList.add("wall");

      if(cell === "goal") {
        div.classList.add("goal");
        div.innerHTML = "🏁";
      }

      if(playerPosition.row === rowIndex && playerPosition.col === colIndex) {
        div.innerHTML = "❤️";
      }

      board.appendChild(div);
    });
  });
}

function moveMaze(direction) {
  let newRow = playerPosition.row;
  let newCol = playerPosition.col;

  if(direction === "up") newRow--;
  if(direction === "down") newRow++;
  if(direction === "left") newCol--;
  if(direction === "right") newCol++;

  if(newRow < 0 || newCol < 0 || newRow >= 9 || newCol >= 9) return;

  if(mazeLayout[newRow][newCol] === "wall") {
    document.getElementById("mazeError").textContent = "Blocked 😭";
    return;
  }

  document.getElementById("mazeError").textContent = "";
  playerPosition = { row:newRow, col:newCol };
  createMaze();

  if(mazeLayout[newRow][newCol] === "goal") {
    document.getElementById("mazeError").textContent = "Maze completed ❤️";
    setTimeout(()=>{
      document.getElementById("mazePuzzle").classList.add("hidden");
      document.getElementById("safePuzzle").classList.remove("hidden");
    },800);
  }
}

function resetMaze() {
  playerPosition = { row:0, col:0 };
  createMaze();
  document.getElementById("mazeError").textContent = "";
}

let safeDigits = [0,0,0,0,0,0];

function changeDigit(index,change) {
  safeDigits[index] += change;
  if(safeDigits[index] > 9) safeDigits[index] = 0;
  if(safeDigits[index] < 0) safeDigits[index] = 9;
  document.getElementById("digit"+index).textContent = safeDigits[index];
}

function checkSafe() {
  const code = safeDigits.join("");

  if(code === "240823") {
    document.getElementById("safeError").textContent = "Safe unlocked ❤️";
    setTimeout(()=>{
      document.getElementById("safePuzzle").classList.add("hidden");
      document.getElementById("namePuzzle").classList.remove("hidden");
    },800);
  } else {
    document.getElementById("safeError").textContent = "Wrong code 😭";
  }
}

function checkNames() {
  const answers = [
    normalizeText(document.getElementById("name1").value),
    normalizeText(document.getElementById("name2").value),
    normalizeText(document.getElementById("name3").value),
    normalizeText(document.getElementById("name4").value),
    normalizeText(document.getElementById("name5").value)
  ];

  const carNames = [answers[0], answers[1]].sort().join(",");
  const correctCar = ["SMILEY", "GINGER"].sort().join(",");

  if(
    carNames === correctCar &&
    answers[2] === "LEO" &&
    answers[3] === "CAROTTE" &&
    answers[4] === "LUCKY"
  ) {
    document.getElementById("nameError").textContent = "Names unlocked ❤️";
    setTimeout(()=>{
      document.getElementById("namePuzzle").classList.add("hidden");
      document.getElementById("countdownPuzzle").classList.remove("hidden");
      updateItalyCountdown();
      setInterval(updateItalyCountdown, 1000);
    },800);
  } else {
    document.getElementById("nameError").textContent = "One of the names is wrong 😭";
  }
}

function updateItalyCountdown() {
  const target = new Date("2026-08-14T00:00:00").getTime();
  const now = new Date().getTime();
  const distance = target - now;

  if(distance <= 0) {
    document.getElementById("italyCountdown").innerHTML = "Italy day is here 🇮🇹";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("italyCountdown").innerHTML =
    days + " days<br>" +
    hours + " hours<br>" +
    minutes + " minutes<br>" +
    seconds + " seconds";
}

function checkEmoji() {
  const emoji = document.getElementById("emojiInput").value.trim();

  if(emoji === "🇮🇹") {
    document.getElementById("emojiError").textContent = "";
    document.getElementById("countdownPuzzle").classList.add("hidden");
    document.getElementById("thousandFinal").classList.remove("hidden");
  } else {
    document.getElementById("emojiError").textContent = "Only one emoji can open this 🇮🇹";
  }
}
