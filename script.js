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
    "protocolScreen"
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
/* GAME 3 — BLACKOUT PROTOCOL */
/* ========================= */

let protocolSwitches = {
  core: false,
  signal: false,
  memory: false
};

let terminalState = {
  scanned: false
};

let symbolSequence = [];
let correctSymbolSequence = ["star", "moon", "fire", "key"];

let selectedFiles = [];
let correctFiles = ["heartbeat", "echo", "pulse"];

let holdInterval = null;
let holdProgress = 0;

function startProtocol() {
  document.getElementById("protocolIntro").classList.add("hidden");
  document.getElementById("protocolPhase1").classList.remove("hidden");
}

function toggleProtocolSwitch(name) {
  protocolSwitches[name] = !protocolSwitches[name];

  const buttonMap = {
    core: "switchCore",
    signal: "switchSignal",
    memory: "switchMemory"
  };

  const labelMap = {
    core: "CORE",
    signal: "SIGNAL",
    memory: "MEMORY"
  };

  const btn = document.getElementById(buttonMap[name]);

  if (protocolSwitches[name]) {
    btn.textContent = labelMap[name] + ": ON";
    btn.classList.add("selected-file");
  } else {
    btn.textContent = labelMap[name] + ": OFF";
    btn.classList.remove("selected-file");
  }

  if (protocolSwitches.core && protocolSwitches.signal && protocolSwitches.memory) {
    document.getElementById("phase1Hint").classList.remove("hidden");
  }
}

function checkPhase1() {
  const input = normalizeText(document.getElementById("phase1Input").value);
  const error = document.getElementById("phase1Error");

  if (input === "WAKE THE ARCHIVE") {
    document.getElementById("protocolPhase1").classList.add("hidden");
    document.getElementById("protocolPhase2").classList.remove("hidden");
  } else {
    error.textContent = "The archive is still sleeping. Turn on the systems and use the phrase.";
  }
}

function terminalWrite(text) {
  const log = document.getElementById("terminalLog");
  const p = document.createElement("p");
  p.textContent = "> " + text;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

function runTerminalCommand() {
  const inputElement = document.getElementById("terminalInput");
  const command = inputElement.value.trim().toLowerCase();
  const error = document.getElementById("terminalError");

  error.textContent = "";
  terminalWrite(command);
  inputElement.value = "";

  if (command === "/help") {
    terminalWrite("Available commands:");
    terminalWrite("/scan");
    terminalWrite("/open vault-1000");
    terminalWrite("/hint");
  } else if (command === "/hint") {
    terminalWrite("Scan before opening anything.");
  } else if (command === "/scan") {
    terminalState.scanned = true;
    terminalWrite("Scanning archive...");
    terminalWrite("Archive found: vault-1000");
    terminalWrite("Next command suggested: /open vault-1000");
  } else if (command === "/open vault-1000") {
    if (terminalState.scanned) {
      terminalWrite("Vault opened.");
      terminalWrite("Signal sequence required.");
      setTimeout(() => {
        document.getElementById("protocolPhase2").classList.add("hidden");
        document.getElementById("protocolPhase3").classList.remove("hidden");
      }, 700);
    } else {
      terminalWrite("Access denied. Run /scan first.");
    }
  } else {
    terminalWrite("Unknown command. Type /help.");
  }
}

document.getElementById("terminalInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") runTerminalCommand();
});

function pressSymbol(symbol) {
  symbolSequence.push(symbol);

  const symbolNames = {
    star: "★",
    moon: "☾",
    fire: "◆",
    key: "⌁"
  };

  document.getElementById("symbolProgress").textContent =
    symbolSequence.map(s => symbolNames[s]).join(" ");

  const currentIndex = symbolSequence.length - 1;

  if (symbolSequence[currentIndex] !== correctSymbolSequence[currentIndex]) {
    document.getElementById("symbolError").textContent =
      "Wrong signal. The system reset.";
    resetSymbolSequence();
    return;
  }

  if (symbolSequence.length === correctSymbolSequence.length) {
    document.getElementById("symbolError").textContent =
      "Signal accepted.";
    setTimeout(() => {
      document.getElementById("protocolPhase3").classList.add("hidden");
      document.getElementById("protocolPhase4").classList.remove("hidden");
    }, 700);
  }
}

function resetSymbolSequence() {
  symbolSequence = [];
  document.getElementById("symbolProgress").textContent = "none";
}

function selectArchiveFile(file) {
  if (selectedFiles.includes(file)) {
    selectedFiles = selectedFiles.filter(f => f !== file);
  } else {
    if (selectedFiles.length < 3) {
      selectedFiles.push(file);
    }
  }

  const buttons = document.querySelectorAll(".file-grid button");
  buttons.forEach(btn => btn.classList.remove("selected-file"));

  selectedFiles.forEach(selected => {
    const matchingButton = Array.from(buttons).find(btn =>
      btn.getAttribute("onclick").includes("'" + selected + "'")
    );

    if (matchingButton) {
      matchingButton.classList.add("selected-file");
    }
  });

  document.getElementById("fileProgress").textContent =
    selectedFiles.length ? selectedFiles.join(", ") : "none";
}

function checkArchiveFiles() {
  const error = document.getElementById("fileError");

  const sortedSelected = [...selectedFiles].sort().join(",");
  const sortedCorrect = [...correctFiles].sort().join(",");

  if (sortedSelected === sortedCorrect) {
    error.textContent = "Archive keys accepted.";
    setTimeout(() => {
      document.getElementById("protocolPhase4").classList.add("hidden");
      document.getElementById("protocolPhase5").classList.remove("hidden");
    }, 700);
  } else {
    error.textContent = "Wrong files. Hint: heartbeat, echo, pulse.";
  }
}

function resetArchiveFiles() {
  selectedFiles = [];
  document.getElementById("fileProgress").textContent = "none";

  const buttons = document.querySelectorAll(".file-grid button");
  buttons.forEach(btn => btn.classList.remove("selected-file"));

  document.getElementById("fileError").textContent = "";
}

function checkCipher() {
  const answer = normalizeText(document.getElementById("cipherInput").value);
  const error = document.getElementById("cipherError");

  if (answer === "I CHOOSE YOU") {
    error.textContent = "Mirror cipher solved.";
    setTimeout(() => {
      document.getElementById("protocolPhase5").classList.add("hidden");
      document.getElementById("protocolPhase6").classList.remove("hidden");
    }, 700);
  } else {
    error.textContent = "Not decoded yet. Hint: A becomes Z, so R becomes I.";
  }
}

function startHolding() {
  if (holdInterval) return;

  document.getElementById("holdError").textContent = "";

  holdInterval = setInterval(() => {
    holdProgress += 2;
    document.getElementById("chargeFill").style.width = holdProgress + "%";

    if (holdProgress >= 100) {
      clearInterval(holdInterval);
      holdInterval = null;

      document.getElementById("holdError").textContent = "System stabilized.";

      setTimeout(() => {
        document.getElementById("protocolPhase6").classList.add("hidden");
        document.getElementById("protocolFinal").classList.remove("hidden");
      }, 800);
    }
  }, 120);
}

function stopHolding() {
  if (holdProgress >= 100) return;

  clearInterval(holdInterval);
  holdInterval = null;
  holdProgress = 0;

  document.getElementById("chargeFill").style.width = "0%";
  document.getElementById("holdError").textContent =
    "Released too early. Start again.";
}

function checkProtocolFinal() {
  const answer = normalizeText(document.getElementById("protocolFinalInput").value);
  const error = document.getElementById("protocolFinalError");

  if (answer === "DAY 1000") {
    error.textContent = "";
    document.getElementById("protocolReward").classList.remove("hidden");
  } else {
    error.textContent = "Hint: today is not just a date. It is a day number.";
  }
}
