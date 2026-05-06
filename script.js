const correctPassword = "BHEBIK";
const correctAnswer = "ALBO LA ALBE";
const correctNotesCode = "ELEO983";

const puzzleSize = 4;
let puzzleOrder = [];
let selectedPiece = null;

function normalizeText(text) {
  return text.trim().toUpperCase().replace(/\s+/g, " ");
}

function showScreen(screenId) {
  const screens = [
    "passwordScreen",
    "questionScreen",
    "letterScreen",
    "proofScreen",
    "puzzleScreen",
    "codeScreen",
    "secondLetterScreen"
  ];

  screens.forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });

  document.getElementById(screenId).classList.remove("hidden");
}

function checkPassword() {
  const input = normalizeText(document.getElementById("passwordInput").value);
  const errorMsg = document.getElementById("passwordError");

  if (input === correctPassword) {
    showScreen("questionScreen");
  } else {
    const messages = [
      "Nope 😌 hint: it's something I tell you kel yom...",
      "Hmm... try harder ya hayete ❤️",
      "Access denied by the Ministry of Love 😂",
      "Wrong password... bas ba3dik bhebek 😘"
    ];

    errorMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
  }
}

function checkAnswer() {
  const input = normalizeText(document.getElementById("answerInput").value);
  const errorMsg = document.getElementById("answerError");

  if (input === correctAnswer) {
    showScreen("letterScreen");
  } else {
    errorMsg.textContent = "Hmm la2... think about what I call you 😌❤️";
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

    piece.style.backgroundPosition = `${(col / (puzzleSize - 1)) * 100}% ${(row / (puzzleSize - 1)) * 100}%`;

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

  [puzzleOrder[selectedPiece], puzzleOrder[position]] = [puzzleOrder[position], puzzleOrder[selectedPiece]];
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
    errorMsg.textContent = "Not this one ya albe... check your notes again 😜";
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
