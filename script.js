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
    "investigationScreen"
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
    errorMsg.textContent =
      "Not this one ya albe... check your notes again 😜";
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
/* GAME 3 — THE INVESTIGATION */
/* ========================= */

function checkInv1() {

  const answer =
    normalizeText(document.getElementById("invAnswer1").value);

  if(answer === "270623") {

    document.getElementById("inv2")
      .classList.remove("hidden");

    document.getElementById("invError1")
      .textContent = "Correct detective ❤️";

  } else {

    document.getElementById("invError1")
      .textContent = "Wrong date detective 😌";

  }
}

function checkInv2() {

  const answer =
    normalizeText(document.getElementById("invAnswer2").value);

  if(answer === "2002") {

    document.getElementById("inv3")
      .classList.remove("hidden");

    document.getElementById("invError2")
      .textContent = "Memory restored ❤️";

  } else {

    document.getElementById("invError2")
      .textContent = "Not the right pharmacy 😏";

  }
}

function checkInv3() {

  const artist =
    normalizeText(document.getElementById("invAnswer3a").value);

  const location =
    normalizeText(document.getElementById("invAnswer3b").value);

  if(
    artist === "JOSEPH ATTIEH" &&
    location === "EHDEN"
  ) {

    document.getElementById("inv4")
      .classList.remove("hidden");

    document.getElementById("invError3")
      .textContent = "Ticket restored 🎫";

  } else {

    document.getElementById("invError3")
      .textContent = "Corrupted memory 👀";

  }
}

function checkInv4() {

  const answer =
    normalizeText(document.getElementById("invAnswer4").value);

  if(answer === "SARI3A") {

    document.getElementById("inv5")
      .classList.remove("hidden");

    document.getElementById("invError4")
      .textContent = "Inside joke detected 😭";

  } else {

    document.getElementById("invError4")
      .textContent = "Still encrypted 😜";

  }
}

function checkInv5() {

  const answer =
    normalizeText(document.getElementById("invAnswer5").value);

  if(answer === "OASIS=5-1-19-9-19") {

    document.getElementById("inv6")
      .classList.remove("hidden");

    document.getElementById("invError5")
      .textContent = "Evidence accepted 🧸";

  } else {

    document.getElementById("invError5")
      .textContent = "Wrong hidden evidence";

  }
}

function checkInv6() {

  const answer =
    normalizeText(document.getElementById("invAnswer6").value);

  if(answer === "55") {

    document.getElementById("inv7")
      .classList.remove("hidden");

    document.getElementById("invError6")
      .textContent = "Flower clue restored 🌸";

  } else {

    document.getElementById("invError6")
      .textContent = "The flower still hides something";

  }
}

function checkInv7() {

  const answer =
    normalizeText(document.getElementById("invAnswer7").value);

  if(answer === "OASIS JBEIL") {

    document.getElementById("inv8")
      .classList.remove("hidden");

    document.getElementById("invError7")
      .textContent = "Location unlocked 🍸";

  } else {

    document.getElementById("invError7")
      .textContent = "Wrong location";

  }
}

function checkInv8() {

  const answer =
    normalizeText(document.getElementById("invAnswer8").value);

  if(
    answer ===
    "270623-2002-EHDEN-JOSEPH-SARI3A-55-OASIS"
  ) {

    document.getElementById("invFinal")
      .classList.remove("hidden");

    document.getElementById("invError8")
      .textContent = "Master combination accepted 🔒";

  } else {

    document.getElementById("invError8")
      .textContent = "Combination incorrect";

  }
}

function checkInvFinal() {

  const answer =
    normalizeText(document.getElementById("invFinalAnswer").value);

  if(answer === "MARTE L MOUSTA2BALIYE") {

    document.getElementById("invFinalError")
      .innerHTML =
      "❤️ Case closed detective... you solved us.";

  } else {

    document.getElementById("invFinalError")
      .innerHTML =
      "You know the answer better than anyone 😌";

  }
}
