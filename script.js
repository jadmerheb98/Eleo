const correctPassword = "BHEBIK";

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim().toUpperCase();
  const errorMsg = document.getElementById("errorMsg");

  if (input === correctPassword) {
    document.getElementById("passwordScreen").classList.add("hidden");
    document.getElementById("letterScreen").classList.remove("hidden");
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

document.getElementById("passwordInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    checkPassword();
  }
});
