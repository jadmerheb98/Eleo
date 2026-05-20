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

/* ========================= */
/* GAME 3 */
/* ========================= */

function startThousandGame() {
  document.getElementById("thousandIntro").classList.add("hidden");
  document.getElementById("heartPuzzle").classList.remove("hidden");
}

/* HEARTS */

let selectedHearts = [];
const correctHearts = [
  "choose",
  "you",
  "always",
  "again"
];

function chooseHeart(word) {

  selectedHearts.push(word);

  document.getElementById("heartProgress").textContent =
    selectedHearts.join(" ❤️ ");

  const currentIndex = selectedHearts.length - 1;

  if(selectedHearts[currentIndex] !== correctHearts[currentIndex]) {

    document.getElementById("heartError").textContent =
      "Wrong order 😭";

    setTimeout(() => {
      resetHearts();
    }, 1000);

    return;
  }

  if(selectedHearts.length === correctHearts.length) {

    document.getElementById("heartError").textContent =
      "Piece collected ❤️";

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

/* MAZE */

const mazeLayout = [
  ["start","","wall","",""],
  ["wall","","wall","","wall"],
  ["","","","","wall"],
  ["wall","wall","","wall",""],
  ["","","","","goal"]
];

let playerPosition = { row:0, col:0 };

function createMaze() {

  const board = document.getElementById("mazeBoard");
  board.innerHTML = "";

  mazeLayout.forEach((row,rowIndex)=>{

    row.forEach((cell,colIndex)=>{

      const div = document.createElement("div");

      div.classList.add("maze-cell");

      if(cell === "wall"){
        div.classList.add("wall");
      }

      if(cell === "goal"){
        div.classList.add("goal");
        div.innerHTML = "🏁";
      }

      if(
        playerPosition.row === rowIndex &&
        playerPosition.col === colIndex
      ){
        div.innerHTML = "❤️";
      }

      board.appendChild(div);

    });

  });

}

function moveMaze(direction){

  let newRow = playerPosition.row;
  let newCol = playerPosition.col;

  if(direction === "up") newRow--;
  if(direction === "down") newRow++;
  if(direction === "left") newCol--;
  if(direction === "right") newCol++;

  if(
    newRow < 0 ||
    newCol < 0 ||
    newRow >= 5 ||
    newCol >= 5
  ){
    return;
  }

  if(mazeLayout[newRow][newCol] === "wall"){

    document.getElementById("mazeError").textContent =
      "Blocked 😭";

    return;
  }

  playerPosition = {
    row:newRow,
    col:newCol
  };

  createMaze();

  if(mazeLayout[newRow][newCol] === "goal"){

    document.getElementById("mazeError").textContent =
      "Maze completed ❤️";

    setTimeout(()=>{

      document.getElementById("mazePuzzle").classList.add("hidden");
      document.getElementById("safePuzzle").classList.remove("hidden");

    },800);

  }

}

function resetMaze(){

  playerPosition = {
    row:0,
    col:0
  };

  createMaze();

  document.getElementById("mazeError").textContent = "";

}

/* SAFE */

let safeDigits = [0,0,0,0];

function changeDigit(index,change){

  safeDigits[index] += change;

  if(safeDigits[index] > 9) safeDigits[index] = 0;
  if(safeDigits[index] < 0) safeDigits[index] = 9;

  document.getElementById("digit"+index).textContent =
    safeDigits[index];

}

function checkSafe(){

  const code = safeDigits.join("");

  if(code === "1000"){

    document.getElementById("safeError").textContent =
      "Safe unlocked ❤️";

    setTimeout(()=>{

      document.getElementById("safePuzzle").classList.add("hidden");
      document.getElementById("balancePuzzle").classList.remove("hidden");

      createBalanceGame();

    },800);

  }else{

    document.getElementById("safeError").textContent =
      "Wrong code 😭";

  }

}

/* BALANCE */

const balanceWords = [
  { word:"first date", side:"past" },
  { word:"first kiss", side:"past" },
  { word:"first laugh", side:"past" },
  { word:"home", side:"future" },
  { word:"wedding", side:"future" },
  { word:"family", side:"future" }
];

let placedWords = [];

function createBalanceGame(){

  const bank = document.getElementById("wordBank");
  bank.innerHTML = "";

  balanceWords.forEach((item,index)=>{

    const btn = document.createElement("button");

    btn.textContent =
      item.word + " →";

    btn.onclick = () => placeWord(index);

    bank.appendChild(btn);

  });

}

function placeWord(index){

  const item = balanceWords[index];

  if(placedWords.find(p=>p.word === item.word)){
    return;
  }

  const choosePast =
    confirm("Press OK for PAST\nPress Cancel for FUTURE");

  const chosenSide =
    choosePast ? "past" : "future";

  placedWords.push({
    word:item.word,
    side:chosenSide
  });

  renderBalance();

}

function renderBalance(){

  const pastBox =
    document.getElementById("pastBox");

  const futureBox =
    document.getElementById("futureBox");

  pastBox.innerHTML = "";
  futureBox.innerHTML = "";

  placedWords.forEach(item=>{

    const btn =
      document.createElement("button");

    btn.textContent =
      item.word;

    if(item.side === "past"){
      pastBox.appendChild(btn);
    }else{
      futureBox.appendChild(btn);
    }

  });

}

function checkBalance(){

  if(placedWords.length !== balanceWords.length){

    document.getElementById("balanceError").textContent =
      "Sort all words first 😌";

    return;
  }

  let correct = true;

  placedWords.forEach(item=>{

    const original =
      balanceWords.find(w=>w.word === item.word);

    if(original.side !== item.side){
      correct = false;
    }

  });

  if(correct){

    document.getElementById("balanceError").textContent =
      "Everything balanced ❤️";

    setTimeout(()=>{

      document.getElementById("balancePuzzle").classList.add("hidden");
      document.getElementById("realCluePuzzle").classList.remove("hidden");

    },800);

  }else{

    document.getElementById("balanceError").textContent =
      "Some memories are misplaced 😭";

  }

}

function resetBalance(){

  placedWords = [];

  renderBalance();

  document.getElementById("balanceError").textContent = "";

}

/* REAL CLUE */

function checkRealClue(){

  const answer =
    normalizeText(
      document.getElementById("realClueInput").value
    );

  if(answer === "DAY 1000"){

    document.getElementById("realClueError").textContent =
      "Final piece collected ❤️";

    setTimeout(()=>{

      document.getElementById("realCluePuzzle").classList.add("hidden");
      document.getElementById("thousandFinal").classList.remove("hidden");

    },800);

  }else{

    document.getElementById("realClueError").textContent =
      "Wrong hidden clue 😭";

  }

}

/* FINAL */

function checkThousandFinal(){

  const answer =
    normalizeText(
      document.getElementById("thousandFinalInput").value
    );

  if(answer === "MARTE L MOUSTA2BALIYE"){

    document.getElementById("thousandReward")
      .classList.remove("hidden");

    document.getElementById("thousandFinalError")
      .textContent = "";

  }else{

    document.getElementById("thousandFinalError")
      .textContent =
      "You know the answer 😌❤️";

  }

}
