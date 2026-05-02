const correctPassword = "BHEBIK";
const correctAnswer = "ALBO LA ALBE";

function normalizeText(text) {
  return text.trim().toUpperCase().replace(/\s+/g, " ");
}

function showScreen(screenId) {
  document.getElementById("passwordScreen").classList.add("hidden");
  document.getElementById("questionScreen").classList.add("hidden");
  document.getElementById("letterScreen").classList.add("hidden");

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

document.getElementById("passwordInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkPassword();
});

document.getElementById("answerInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkAnswer();
});
